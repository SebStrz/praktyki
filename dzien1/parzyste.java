import java.util.Scanner;

public class parzyste {
    public static void main(String[] args) {
        System.out.println("Podaj liczbe użytkowników: ");
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        if (a%2==0){
            System.out.println("parzysta liczba użytkowników");
        }else{
            System.out.println("nieparzysta liczba użytkowników");
        }

    }

}