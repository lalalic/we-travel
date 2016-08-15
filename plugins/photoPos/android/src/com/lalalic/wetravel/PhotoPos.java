package com.wetravel.record;

import java.io.File;

import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.MediaStore.MediaColumns;

import android.util.Log;

public class PhotosObserver extends ContentObserver {
	public PhotosObserver() {
		super(null);
	}

	@Override
	public void onChange(boolean selfChange) {
		super.onChange(selfChange);
		Media media = readFromMediaStore(getApplicationContext(),
				MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
		saved = "I detected " + media.file.getName();
		Log.d("INSTANT", "detected picture");
	}
	
	private Media readFromMediaStore(Context context, Uri uri) {
		Cursor cursor = context.getContentResolver().query(uri, null, null,
				null, "date_added DESC");
		Media media = null;
		if (cursor.moveToNext()) {
			int dataColumn = cursor.getColumnIndexOrThrow(MediaColumns.DATA);
			String filePath = cursor.getString(dataColumn);
			int mimeTypeColumn = cursor
					.getColumnIndexOrThrow(MediaColumns.MIME_TYPE);
			String mimeType = cursor.getString(mimeTypeColumn);
			media = new Media(new File(filePath), mimeType);
		}
		cursor.close();
		return media;
	}
	
	private class Media {
		private File file;
		@SuppressWarnings("unused")
		private String type;

		public Media(File file, String type) {
			this.file = file;
			this.type = type;
		}
	}
	
}



