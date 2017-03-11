package com.edu.test;

import java.util.HashMap;
import java.util.Map;

import com.edu.httpclient.HelperUtils;

public class NodeTest {
	private String url = "http://localhost:3000";
	
	private void addToCart(String username, int productId) {
		Map<String, String> json = new HashMap<String, String>();
		json.put("username", username);
		json.put("productId", productId + "");
		
		String api = url + "/addToCart";
		String response = HelperUtils.httpPOST(api, json);
		
		System.out.println("HTTP POST: " + api + "\t"+ response);
	}
	
	public static void main(String args[]) {
		NodeTest test = new NodeTest();
		test.addToCart("jagruti", 6);
	}
	
}
