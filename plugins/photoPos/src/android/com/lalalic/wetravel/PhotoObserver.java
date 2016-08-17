package com.lalalic.wetravel;

import java.io.File;

import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.MediaStore.MediaColumns;

import android.util.Log;

import android.content.Context;
import android.app.Service;
import android.os.IBinder;
import android.content.Intent;

import android.media.ExifInterface;

public class PhotoObserver extends Service{
	private final String TAG="we.travel";
	
	@Override
	public void onCreate(){
		super.onCreate();
		this.getApplication().getContentResolver()
			.registerContentObserver(
					MediaStore.Images.Media.EXTERNAL_CONTENT_URI, false,
					new Observer(this.getApplication()));
	}
	
	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		return START_NOT_STICKY;
	}
	
	@Override
	public IBinder onBind (Intent intent){
		return null;
	}
	
	private class Observer extends ContentObserver {
		private Context context;
		
		public Observer(Context context) {
			super(null);
			this.context=context;
			Log.d(TAG, "PhotoObserver is started");
		}

		@Override
		public void onChange(boolean selfChange) {
			super.onChange(selfChange);
			
			Cursor cursor = this.context.getContentResolver()
				.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, null, null,
					null, "date_added DESC");
			if (cursor.moveToNext()) {
				int dataColumn = cursor.getColumnIndexOrThrow(MediaColumns.DATA);
				String filePath = cursor.getString(dataColumn);
				int mimeTypeColumn = cursor
						.getColumnIndexOrThrow(MediaColumns.MIME_TYPE);
				String mimeType = cursor.getString(mimeTypeColumn);
				Log.d(TAG, "photo taken: "+this.readExif(filePath));
			}
			cursor.close();
		}
		
		private String readExif(String file){
			try{
				ExifInterface exifInterface = new ExifInterface(file);
				String time=exifInterface.getAttribute(ExifInterface.TAG_DATETIME);
				float[] loc=new float[2]
				exifInterface.getLatLong(loc);
				return file+";"+time+";"+loc[0]+";"+loc[1];//+";"+area;
			}catch(Exception ex){
				 ex.printStackTrace();
				 Log.e(TAG, ex.getMessage());
				 return file;
			}
		}
	}
}

