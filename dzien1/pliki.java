import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class pliki {
    public static void main(String[] args) throws IOException {
        File plik = new File("dane.txt");
        if(plik.createNewFile()){
            FileWriter writer = new FileWriter(plik);
            writer.write("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt ligula pellentesque, pretium leo id,\n" +
                    " porttitor turpis. Mauris mattis felis et metus pharetra, sit amet efficitur eros eleifend. Morbi eget vehicula ante,\n" +
                    " sed lobortis erat. Integer placerat sit amet sem eleifend pharetra. Cras vestibulum leo vitae sapien auctor vulputate.\n" +
                    " Aenean in ex ex. Morbi ullamcorper ut nunc nec iaculis. Fusce vitae lacinia urna. Curabitur a lacus ut leo rutrum imperdiet.\n" +
                    " Etiam sit amet sapien in neque euismod blandit. Fusce id nisi tristique, tempus nisl eget, volutpat ante. Phasellus malesuada");
            writer.close();
            Scanner sc = new Scanner(plik);
            while(sc.hasNextLine()){
                String a = sc.nextLine();
                System.out.println(a);
            }
        }
    }
}
