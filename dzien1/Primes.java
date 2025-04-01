import java.util.Scanner;

public class Primes {
    public static void main(String[] args){
        System.out.println("podaj liczbę: ");
        Scanner sc = new Scanner(System.in);
        String output = (isPrime(sc.nextInt())) ? "liczba jest pierwsza" : "liczba nie jest pierwsza";
        System.out.println(output);
        sc.close();
    }
    public static boolean isPrime(int a){
        for (int i = 2; i < Math.sqrt(a); i++) {
            if ( a % i == 0 ){
                return false;
            }
        }
        return true;
    }
}
