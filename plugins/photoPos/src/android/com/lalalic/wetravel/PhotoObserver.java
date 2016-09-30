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
			Log.i(PhotoPosPlugin.TAG, "PhotoPosObserver is started");
		}

		@Override
		public void onChange(boolean selfChange) {
			super.onChange(selfChange);
			
			Cursor cursor = this.context.getContentResolver()
				.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
						new String[]{
								MediaStore.MediaColumns.DATA
								,MediaStore.Images.ImageColumns.DATE_TAKEN
								,MediaStore.Images.ImageColumns.LATITUDE
								,MediaStore.Images.ImageColumns.LONGITUDE
						},
						"mime_type=? and _data like ?",
						new String[]{"image/jpeg","%DCIM/Camera%"},
						"datetaken DESC");
			if (cursor.moveToNext()) {
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

				if(loc!=null)
					PhotoPosPlugin.save(this.context, loc, taken, filePath);
			}
			cursor.close();
		}
	}
}

