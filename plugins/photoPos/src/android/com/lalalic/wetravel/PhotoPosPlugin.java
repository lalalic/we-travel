package com.lalalic.wetravel;

import org.apache.cordova.CordovaPlugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import android.content.Intent;

import android.util.Log;

public class PhotoPosPlugin extends CordovaPlugin{
	private final String TAG="we.travel";
	
	public String getServiceName(){
		return "photoPos";
	}
	protected void pluginInitialize(){
		this.cordova.getActivity().sendBroadcast(new Intent("com.lalalic.wetravel.PhotoPos"));
		Log.d(TAG,"photoPos plugin initialized");
	}
}