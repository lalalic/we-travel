package com.lalalic.wetravel;

import org.apache.cordova.CordovaPlugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;

import android.database.Cursor;
import android.media.ExifInterface;
import android.provider.MediaStore;
import android.text.format.DateUtils;
import android.util.Log;

import java.util.Date;

public class PhotoPosPlugin extends CordovaPlugin{
	public final static String TAG="we.travel";
	
	protected void pluginInitialize(){
		this.cordova.getActivity().sendBroadcast(new Intent("com.lalalic.wetravel.PhotoPos"));
		Log.i(TAG,"photoPos plugin initialized");
	}

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		if("extract".equals(action)){
			final Context context=this.cordova.getActivity().getApplicationContext();
			final long from=args.getLong(0);
			final long to= args.getLong(1);
			cordova.getThreadPool().execute(new Runnable() {
				@Override
				public void run() {
					int counter=0;
					Cursor cursor=context.getContentResolver().query(
							MediaStore.Images.Media.EXTERNAL_CONTENT_URI
							,new String[]{
									MediaStore.MediaColumns.DATA
									,MediaStore.Images.ImageColumns.DATE_TAKEN
									,MediaStore.Images.ImageColumns.LATITUDE
									,MediaStore.Images.ImageColumns.LONGITUDE
							}
							,"datetaken>=? AND datetaken<=? AND mime_type=? and _data like ?"
							,new String[]{String.valueOf(from),String.valueOf(to),"image/jpeg", "%DCIM/Camera%"}
							,null);
					try{
						while(cursor.moveToNext()){
							int i=0;
							String filePath = cursor.getString(i++);
							long taken=cursor.getLong(i++);
							float lat=cursor.getFloat(i++);
							float lng=cursor.getFloat(i++);
							float[] loc=null;
							if(lat!=0 || lng!=0)
								loc=new float[]{lat,lng};
							else
								loc=PhotoPosPlugin.readPosInExif(filePath);

							if(loc!=null) {
								Log.i(TAG+".GPS", "a photo taken at " + loc[0]+","+loc[1] + " on " + taken);
								counter++;
								PluginResult r=new PluginResult(PluginResult.Status.OK,new JSONObject()
										.put("photos",new JSONArray().put(new JSONObject()
											.put("file",filePath)
											.put("taken",taken)))
										.put("lat",loc[0])
										.put("lng",loc[1]));
								r.setKeepCallback(true);
								callbackContext.sendPluginResult(r);
							}
						}
						Log.d(TAG+".GPS", "found "+counter+" photos with position information");
						callbackContext.success(0);
					}catch(Exception ex){
						Log.e(TAG,ex.getMessage(), ex);
						callbackContext.error(ex.getMessage());
					}finally{
						cursor.close();
					}
					
					
				}
			});
			return true;
		}
		return false;
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

	public static int save(Context ctx, float[] loc, long takentime, String filePath){
		return 0;
	}
}