import java.util.Scanner;
import java.io.*;

public class MathematicalArray 
{	
    public static void main(String[] args)
    {
    	int number1, count,arraynum =100;
    	
    	int[] numbers = new int[arraynum];
    	int condition;
    	Scanner number = new Scanner(System.in);
    	System.out.println("Enter the count of numbers:\n");
    	count = number.nextInt();
    	System.out.println("Enter "+count+ " numbers:\n");
    	for (int i = 0; i < count; i++) {
			numbers[i] = number.nextInt();
		}
    	condition=0;
    	do {
    		
			System.out.println("Select operation:\n1. Addition\n2. Subtraction\n3. Multiplication\n4. Exit");
			condition=number.nextInt();
			int result = 0;
			if (condition==1) {
				for (int i=0; i < count ; i++) 
		        {
		        	result = result + numbers[i];
		        }
		        System.out.println("Sum value of array elements is : " + result);

			} 
			else if(condition==2){
				result=numbers[0];
				for (int i=1; i < count ; i++) 
		        {
		        	result = result - numbers[i];
		        }
		        System.out.println("Difference value of array elements is : " + result);
			}
			else if(condition==3){
				result=1;
				for (int i=0; i < count ; i++) 
		        {
		        	result = result * numbers[i];
		        }
		        System.out.println("Multiplication value of array elements is : " + result);
			}
			else if(condition==4){
				System.out.println("You have exited!!");
			}
		} while (condition!=5);	
    }
}