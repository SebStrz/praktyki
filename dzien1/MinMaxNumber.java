import java.util.Arrays;
import java.util.Scanner;

public class MinMaxNumber {
    public static void main(String[] args){
        System.out.println("Podaj liczby odzielone przecinkami");
        Scanner sc = new Scanner(System.in);
        String[] splitInput = sc.next().split(",");
        int[] numbers = new int[splitInput.length];
        for (int i = 0; i < splitInput.length; i++) {
            numbers[i] = Integer.parseInt(splitInput[i]);
        }

        Arrays.sort(numbers);

        System.out.println("najmniejsza liczba: "+numbers[0]);
        System.out.println("najwieksza liczba: "+numbers[numbers.length-1]);
        sc.close();

    }
}
