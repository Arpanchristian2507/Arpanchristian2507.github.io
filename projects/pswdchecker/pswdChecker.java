import java.util.Scanner;

public class pswdChecker {

    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String YELLOW = "\u001B[33m";
    public static final String BLUE = "\u001B[34m";
    public static final String RESET = "\u001B[0m";

    // Common weak passwords
    static String[] commonPasswords = {
            "password",
            "123456",
            "qwerty",
            "admin",
            "password123",
            "abc123",
            "welcome"
    };

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter username: ");
        String username = input.nextLine().toLowerCase();

        System.out.print("Password: ");
        String pswd = input.nextLine();

        checkPassword(pswd, username);
        input.close();
    }


    public static void checkPassword(String pswd, String username){

        int score = 0;

        System.out.println("\nChecking password...\n");

        // LENGTH CHECK
        if(pswd.length() < 8){
            printInColor(RED,
                    "✗ Too short (minimum 8)");
            score -= 5;
        }
        else if(pswd.length() < 12){
            printInColor(YELLOW,
                    "✓ Acceptable length");
            score += 1;
        }
        else if(pswd.length() < 15){
            printInColor(GREEN,
                    "✓ Strong length");
            score += 3;
        }
        else{
            printInColor(BLUE,
                    "✓ Excellent passphrase length");
            score += 5;
        }


        // USERNAME CHECK
        if(pswd.toLowerCase().contains(username)){
            printInColor(RED,
                    "✗ Contains username");
            score -= 5;
        }


        // COMMON PASSWORD CHECK
        for(String weak : commonPasswords){

            if(pswd.toLowerCase().contains(weak)){
                printInColor(RED,
                        "✗ Common password detected");
                score -= 10;
            }
        }


        // SEQUENCE CHECK
        if(hasSequence(pswd)){
            printInColor(RED,
                    "✗ Sequential pattern detected");
            score -= 4;
        }


        // REPEATED CHARACTERS
        if(hasRepeated(pswd)){
            printInColor(RED,
                    "✗ Too many repeated characters");
            score -= 3;
        }


        // CHARACTER DIVERSITY

        boolean upper=false;
        boolean lower=false;
        boolean digit=false;
        boolean symbol=false;

        for(char c : pswd.toCharArray()){

            if(Character.isUpperCase(c))
                upper=true;

            else if(Character.isLowerCase(c))
                lower=true;

            else if(Character.isDigit(c))
                digit=true;

            else
                symbol=true;
        }

        if(upper) score++;
        if(lower) score++;
        if(digit) score++;
        if(symbol) score++;


        // PASSPHRASE BONUS
        if(pswd.contains(" ") && pswd.length()>15){
            printInColor(GREEN,
                    "✓ Passphrase detected");
            score +=3;
        }


        System.out.println("\nFinal Score: " + score);


        // CLASSIFICATION

        if(score<=0){

            printInColor(RED,
                    "\nWEAK PASSWORD");
        }

        else if(score<=4){

            printInColor(YELLOW,
                    "\nOKAY PASSWORD");
        }

        else if(score<=9){

            printInColor(GREEN,
                    "\nSTRONG PASSWORD");
        }

        else{

            printInColor(BLUE,
                    "\nVERY STRONG PASSWORD");
        }

    }



    public static boolean hasSequence(String pswd){

        String lower = pswd.toLowerCase();

        return lower.contains("1234")
                || lower.contains("abcd")
                || lower.contains("qwerty")
                || lower.contains("asdf");
    }



    public static boolean hasRepeated(String pswd){

        int count=1;

        for(int i=1;i<pswd.length();i++){

            if(pswd.charAt(i)==pswd.charAt(i-1)){

                count++;

                if(count>=4)
                    return true;
            }

            else{

                count=1;
            }
        }

        return false;
    }


    public static void printInColor(String color,String text){

        System.out.println(color + text + RESET);
    }

}