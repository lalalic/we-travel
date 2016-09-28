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
	
	public String getServiceName(){
		return "photoPos";
	}
	protected void pluginInitialize(){
		this.cordova.getActivity().sendBroadcast(new Intent("com.lalalic.wetravel.PhotoPos"));
		Log.d(TAG,"photoPos plugin initialized");
	}

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		if("extract".equals(action)){
			final Context context=this.cordova.getActivity().getApplicationContext();
			final String from="0";
			final String to= String.valueOf(new Date().getTime());
			cordova.getThreadPool().execute(new Runnable() {
				@Override
				public void run() {
					int counter=0;
					Cursor cursor=context.getContentResolver().query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
							new String[]{MediaStore.MediaColumns.DATA, MediaStore.MediaColumns.MIME_TYPE,MediaStore.Images.ImageColumns.DATE_TAKEN},
							"datetaken>=? AND datetaken<=?",
							new String[]{from,to},
							"datetaken ASC");
					while(cursor.moveToNext()){
						String filePath = cursor.getString(0);
						String mimeType = cursor.getString(1);
						int taken=cursor.getInt(2);
						String loc=PhotoPosPlugin.readPosInExif(filePath);
						Log.e(TAG, "checking a photo");
						if(loc.length()>0) {
							Log.e(TAG+".GPS", "a photo taken at " + loc + " on " + taken);
							counter++;
						}
					}
					cursor.close();
					Log.e(TAG+".GPS", "found "+counter);
					callbackContext.success("found "+counter+" photos with latlng");
				}
			});
			return true;
		}
		return false;
	}


	public static String readPosInExif(String file){
		try{
			ExifInterface exifInterface = new ExifInterface(file);
			float[] loc=new float[2];
			exifInterface.getLatLong(loc);
			if(loc.length>0)
				return file+";"+loc[0]+";"+loc[1];//+";"+area;
			else
				return "";
		}catch(Exception ex){
			ex.printStackTrace();
			Log.e(TAG, ex.getMessage());
			return file;
		}
	}
}