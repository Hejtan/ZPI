import Enumerators.CRUDAmount;
import dataClasses.User;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

import static Enumerators.PermissionLevel.ADMIN;

public class Main {
    static String USERNAME = "Agata";
    static String PASSWORD = "haslo";
    static String DATABASE = "bazadanych";

    public static void main(String[] args) {
        MongoDBConnection mdbc = new MongoDBConnection(USERNAME, PASSWORD, DATABASE);
        MongoDBFilters mdbf = new MongoDBFilters();
        MongoDBUpdater mdbu = new MongoDBUpdater();
        List<Integer> empty_list = new ArrayList<>();

        // User CRUD
        // CREATE
        User test_user = new User(42, "CRUD_tester", "CRUD_email@mail.com", "password",
                ADMIN, null, empty_list);
        mdbc.UserCUD(new User[]{test_user});

        // READ
        Bson filter = mdbf.allEntries();
        ArrayList<User> users = mdbc.UserRead(CRUDAmount.MANY, filter);
        for (int i = 0; i < users.size(); i++) {
            System.out.println("ID of found user: " + users.get(i).getId());
        }

        // UPDATE
        Bson update_field = mdbu.updateEmail("CRUD@mail.com");
        System.out.println("Before update: " + users.get(0).getMail());
        mdbc.UserCUD(new Bson[]{filter}, new Bson[]{update_field});
        ArrayList<User> users2 = mdbc.UserRead(filter);
        System.out.println("After update: " + users2.get(0).getMail());
/*
        // DELETE
        mdbc.UserCUD(CRUDAmount.MANY, new Bson[]{filter});
        ArrayList<User> users3 = mdbc.UserRead(filter);
        System.out.println(users3.get(0));
*/
    }
}
