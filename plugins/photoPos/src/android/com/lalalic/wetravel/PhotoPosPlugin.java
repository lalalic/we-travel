package com.lalalic.wetravel;

import org.apache.cordova.CordovaPlugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;

import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.media.ExifInterface;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.format.DateUtils;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;
import java.util.Date;

public class PhotoPosPlugin extends CordovaPlugin{
	public final static String TAG="we.travel";
	final static String KEY_LAST_EXTRACT_TIME="lastExtractPhotoPosTime";
    public static TravelDB dbHelper=null;

	protected void pluginInitialize(){
		this.cordova.getActivity().sendBroadcast(new Intent("com.lalalic.wetravel.PhotoPos"));
        dbHelper=new TravelDB(this.cordova.getActivity().getApplicationContext());
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try{
                    extract(0,new Date().getTime(),
                            cordova.getActivity().getContentResolver(),
                            cordova.getActivity().getApplicationContext());
                }catch (Exception ex) {
                    Log.e(TAG, ex.getMessage(), ex);
                }
            }
        });
		Log.i(TAG,"photoPos plugin initialized");
	}

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		final Context context = this.cordova.getActivity().getApplicationContext();
		final long from = args.getLong(0);
		final long to = args.getLong(1);

		if ("extract".equals(action)) {
			cordova.getThreadPool().execute(new Runnable() {
				@Override
				public void run() {
                    try {
                        extract(from, to, context.getContentResolver(), context);
						callbackContext.success(0);
					} catch (Exception ex) {
						Log.e(TAG, ex.getMessage(), ex);
						callbackContext.error(ex.getMessage());
					} finally {

					}
				}
			});
			return true;
		}else if("query".equals(action)){
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        SQLiteDatabase db = dbHelper.getReadableDatabase();
                        JSONArray results = new JSONArray();
                        Cursor cursor = db.rawQuery("select taken,lat,lng,path from photopos where taken>=? and taken<=?", new String[]{"" + from, "" + to});
                        while (cursor.moveToNext()) {
                            results.put(new JSONObject()
                                    .put("taken", cursor.getLong(0))
                                    .put("lat", cursor.getDouble(1))
                                    .put("lng", cursor.getDouble(2))
                                    .put("path", cursor.getString(3)));
                        }
                        cursor.close();
                        db.close();
                        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, results));
                    }catch(Exception ex){
                        Log.e(TAG, ex.getMessage(), ex);
                        callbackContext.error(ex.getMessage());
                    }
                }
            });
            return true;
		}else if("backup".equals(action)){
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    callbackContext.success(dbHelper.backup());
                }
            });
			return true;
        }

		return false;
	}

	public static int extract(final long from, final long to,ContentResolver content,final Context context){
		SharedPreferences preferences=context.getSharedPreferences(TAG, Context.MODE_PRIVATE);
		long start=from;
		if(start==0)
			start=preferences.getLong(KEY_LAST_EXTRACT_TIME, 0);

		int counter = 0;
		Cursor cursor = content.query(
				MediaStore.Images.Media.EXTERNAL_CONTENT_URI
				, new String[]{
						MediaStore.MediaColumns.DATA
						, MediaStore.Images.ImageColumns.DATE_TAKEN
						, MediaStore.Images.ImageColumns.LATITUDE
						, MediaStore.Images.ImageColumns.LONGITUDE
				}
				, "datetaken>=? AND datetaken<=? AND mime_type=? and _data like ?"
				, new String[]{String.valueOf(start), String.valueOf(to), "image/jpeg", "%DCIM/Camera%"}
				, null);
		SQLiteDatabase db=null;
		try {
				while (cursor.moveToNext()) {
                    int i = 0;
					String filePath = cursor.getString(i++);
					long taken = cursor.getLong(i++);
					float lat = cursor.getFloat(i++);
					float lng = cursor.getFloat(i++);
					float[] loc = null;
					if (lat != 0 || lng != 0)
						loc = new float[]{lat, lng};
					else
						loc = readPosInExif(filePath);

					if (loc != null) {
						Log.i(TAG + ".GPS", "a photo taken at " + loc[0] + "," + loc[1] + " on " + taken);
						counter++;
                        if(db==null)
                            db=dbHelper.getWritableDatabase();

                        db.execSQL("insert or ignore into photopos(taken,lat,lng,path,uploaded) values (?,?,?,?,?)"
								, new Object[]{taken, loc[0], loc[1], filePath, 0});
					}
				}

				preferences.edit()
						.putLong(KEY_LAST_EXTRACT_TIME, new Date().getTime())
						.commit();
				Log.d(TAG + ".GPS", "found " + counter + " photos with position information");
				if(counter>0)
					dbHelper.backup();
				return counter;
			}finally {
                if(cursor!=null)
				    cursor.close();
				if(db!=null)
                    db.close();
			}
	}

	public static float[] readPosInExif(String file){
		try{
			ExifInterface exifInterface = new ExifInterface(file);
			float[] loc=new float[2];
			exifInterface.getLatLong(loc);
			if(loc.length>0 && (loc[0]!=0 || loc[1]!=0))
				return loc;
		}catch(Exception ex){
			Log.e(TAG, ex.getMessage(),ex);
		}
		return null;
	}

	public static void save(Context ctx, float[] loc, long taken, String filePath){
        SQLiteDatabase db=null;
        try {
            db=dbHelper.getWritableDatabase();
            db.execSQL("insert into photopos(taken,lat,lng,path,uploaded) values (?,?,?,?,?)"
                            , new Object[]{taken, loc[0], loc[1], filePath, 0});

        }catch(Exception ex){
            Log.e(TAG, ex.getMessage(), ex);
        }finally{
            if(db!=null)
                db.close();
        }
	}

    private static class TravelDB extends SQLiteOpenHelper {
        TravelDB(Context ctx){
            super(ctx,TAG+".db", null, 1);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            Log.d(TAG,"creating we-travel database");

            db.execSQL("CREATE TABLE photopos ("
                    + "taken INTEGER PRIMARY KEY"
                    + ",lat real"
                    + ",lng real"
                    + ",path text"
                    + ",uploaded integer default '0'"
                    + ");");
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

		}

		public int backup(){
			File sd = Environment.getExternalStorageDirectory();
			if(sd.canWrite()){
				FileOutputStream backup=null;
                SQLiteDatabase db=null;
				try {
                    File backupDB=new File(sd+"/"+TAG+"/photopos.json");
                    if(!backupDB.exists()) {
						backupDB.getParentFile().mkdirs();
						backupDB.createNewFile();
					}
                    db=getReadableDatabase();
                    Cursor cursor=db.rawQuery("select taken, lat,lng,path from photopos",null);
                    backup = new FileOutputStream(backupDB);
                    backup.write("[\n\r".getBytes());
                    int counter=0;
                    while(cursor.moveToNext()){
                        counter++;
                        if(counter>1) {
                            backup.write(',');
                        }
                        backup.write(
                            new JSONObject()
                                    .put("taken",cursor.getLong(0))
                                    .put("lat", cursor.getDouble(1))
                                    .put("lng", cursor.getDouble(2))
                                    .put("path", cursor.getString(3))
                                    .toString()
                                    .getBytes("utf8")
                        );
                        backup.write("\n\r".getBytes());
                    }
                    backup.write(']');
                    backup.flush();
					backup.close();
					Log.d(TAG, "photopos db backup done");
                    return counter;
				}catch(Exception ex){
					Log.e(TAG,ex.getMessage(),ex);
                    return -1;
				}finally {
                    db.close();
				}
			}
			return 0;
		}
    }
}
