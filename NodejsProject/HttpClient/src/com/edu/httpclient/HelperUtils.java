package com.edu.httpclient;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;


public class HelperUtils {
	
	public static  String httpPOST(String nodeURL, Map<String, String> map) {        
		try {
			HttpClient client = new HttpClient();
	        PostMethod method = new PostMethod(nodeURL);        
	        int statusCode;

	        for (Map.Entry<String, String> entry : map.entrySet()) {
	        	method.addParameter(entry.getKey(), entry.getValue());
	        }
			statusCode = client.executeMethod(method);
		    StringWriter strWriter = new StringWriter();
	    	   
	        if (statusCode != -1) {
	            IOUtils.copy(method.getResponseBodyAsStream(), strWriter, "UTF-8");
	        }
	        return strWriter.toString();

		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
//	public static String httpGET(String nodeURL) {
//		String getResponse = null;
//		try {
//			HttpClient client = HttpClientBuilder.create().build();
//			HttpGet hGET = new HttpGet(nodeURL);
//			HttpResponse hResponse = client.execute(hGET);
//			if (hResponse.getEntity() != null) {
//				HttpEntity hEntity = hResponse.getEntity();
//			    InputStream inputStream = hEntity.getContent();
//			    
//			    byte[] binaryData = new byte[1024];
//			    inputStream.read(binaryData);
//			    getResponse = new String (binaryData);
//			    getResponse = getResponse.replace("\u0000", ""); 
//			    getResponse = getResponse.replace("\\u0000", "");			    
//			}
//		} catch (Exception e) {
//			System.out.println("Error in HTTP GET Request");
//		} 
//		return getResponse;
//	}

	public static JSONObject toJSONObj(String jStr) {
		JSONObject jsonObj = null;
		try {
			JSONParser parser = new JSONParser();			
			jsonObj = (JSONObject) parser.parse(jStr);			
		} catch (ParseException e) {
			System.out.println("Error in parsing JSON String to JSON Object");
		}
		return jsonObj;
	}
		

	public static String mapToJSONStr(Map<String, String> keyValues) {
		return JSONObject.toJSONString(keyValues);
	}
}
