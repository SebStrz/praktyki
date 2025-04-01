import java.util.Scanner;

public class pierwsze {
    public static void main(String[] args){
        System.out.println("podaj liczbę: ");
        Scanner sc = new Scanner(System.in);

        System.out.println(pierwsza(sc.nextInt()));
    }
    public static boolean pierwsza(int a){
        for (int i = 2; i < a; i++) {
            if (a%i==0){
                return false;
            }
        }
        return true;
    }
}
