package com.lalalic.wetravel;

import android.provider.MediaStore;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import android.util.Log;

public class PhotoPos extends BroadcastReceiver{
	@Override  
	public void onReceive(Context context, Intent intent) {
		context.startService(new Intent(context, PhotoObserver.class));
		Log.i(PhotoPosPlugin.TAG,"photo observer registered");
	}
}



