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
			Log.d(PhotoPosPlugin.TAG, "PhotoObserver is started");
		}

		@Override
		public void onChange(boolean selfChange) {
			super.onChange(selfChange);
			
			Cursor cursor = this.context.getContentResolver()
				.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
						new String[]{MediaColumns.DATA,MediaColumns.MIME_TYPE,MediaStore.Images.ImageColumns.DATE_TAKEN},
						null,
						null,
						"datetaken DESC");
			if (cursor.moveToNext()) {
				String filePath = cursor.getString(0);
				String mimeType = cursor.getString(1);
				int taken=cursor.getInt(2);
				Log.d(PhotoPosPlugin.TAG, "photo taken: "+PhotoPosPlugin.readPosInExif(filePath));
			}
			cursor.close();
		}
	}
}

