import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args){
        System.out.println("podaj słowo: ");
        Scanner sc = new Scanner(System.in);
        isPalindrome(sc.next());
        sc.close();
    }
    public static void isPalindrome(String s){
        int len = s.length()-1;
        for (int i = 0; i < len; i++) {
            if(s.charAt(i)==s.charAt(len-i)){
                continue;
            }else{
                System.out.println("słowo nie jest palindromem");
                return;
            }
        }
        System.out.println("Słowo jest palindomem");
    }
}
