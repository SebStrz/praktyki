import java.util.Scanner;

public class palindrom {
    public static void main(String[] args){
        System.out.println("podaj słowo: ");
        Scanner sc = new Scanner(System.in);
        palindrom(sc.next());
    }
    public static void palindrom(String s){
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
