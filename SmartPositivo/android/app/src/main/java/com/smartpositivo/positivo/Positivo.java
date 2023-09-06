package com.smartpositivo.positivo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import br.com.positivo.printermodule.Printer;
import br.com.positivo.printermodule.PrinterCallback;

public class Positivo extends ReactContextBaseJavaModule {

    public static final String TAG = "SmartPositivo";
    public Printer mPrinter;

    //constructor
    public Positivo(ReactApplicationContext reactContext) {
        super(reactContext);
        mPrinter = new Printer(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Positivo";
    }


    @ReactMethod
    public void show(String text) {
        Context context = getReactApplicationContext();
        Toast.makeText(context, text, Toast.LENGTH_LONG).show();
    }

    private PrinterCallback callback = new PrinterCallback() {
        Context context = getReactApplicationContext();

        @Override
        public void onError(int i, String s) {
            Toast.makeText(context, s, Toast.LENGTH_LONG).show();
        }

        @Override
        public void onRealLength(double v, double v1) {
            Toast.makeText(context, "OnRealLength", Toast.LENGTH_LONG).show();
        }

        @Override
        public void onComplete() {
            Toast.makeText(context, "OnComplete", Toast.LENGTH_LONG).show();
        }
    };

    @ReactMethod
    public void getFirmwareVersion(Promise promise) {
        String version = mPrinter.getFirmwareVersion(callback);
        promise.resolve(version);
    }

    @ReactMethod
    public void printImg(String imgBase64, Promise promise) {
        Bitmap bmp;
        byte[] imageByte;
        imageByte = Base64.decode(imgBase64, Base64.DEFAULT);
        bmp = BitmapFactory.decodeByteArray(imageByte, 0, imageByte.length);
        try {
            mPrinter.printBitmap(bmp, callback);
            promise.resolve("Success");
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }

    }

    @ReactMethod
    public void printText(Promise promise) {
        try {
            mPrinter.printText("0", callback);
            promise.resolve("Success");
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    @ReactMethod
    public void checkPrint(Promise promise) {
        Boolean isReady = mPrinter.isReady();
        promise.resolve(isReady);
    }

    @ReactMethod
    public void checkPaper(Promise promise) {
        Boolean isPaper = mPrinter.hasPaper(callback);
        promise.resolve(isPaper);
    }

    @ReactMethod
    public void checkTemperature(Promise promise) {
        int temperature = mPrinter.printerTemperature(callback);
        promise.resolve(String.valueOf(temperature));
    }

    @ReactMethod
    public void setSpeed(int speed, Promise promise) {
        try {
            mPrinter.setPrinterSpeed(speed, callback);
            promise.resolve("SUCCESS");
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }


}
