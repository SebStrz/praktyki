import java.util.Scanner;

public class tablice {
    public static void main(String[] args){
        System.out.println("Podaj liczby odzielone przecinkami");
        Scanner sc = new Scanner(System.in);
        String[] a = sc.next().split(",");
        int[] liczby = new int[a.length];
        for (int i = 0; i < a.length; i++) {
            liczby[i] = Integer.parseInt(a[i]);
        }
        for (int i = 0; i < liczby.length; i++) {
            for(int j = 0;j< liczby.length-i-1;j++){
                if(liczby[j]>liczby[j+1]){
                    int temp = liczby[j];
                    liczby[j] = liczby[j+1];
                    liczby[j+1] = temp;
                }
            }
        }
        System.out.println("najmniejsza liczba: "+liczby[0]);
        System.out.println("najwieksza liczba: "+liczby[liczby.length-1]);


    }
}
