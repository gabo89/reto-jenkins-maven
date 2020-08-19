package arcmop.blog.springbootest.controladores;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.gte;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.bson.Document;
import org.bson.types.ObjectId;

@RestController
@RequestMapping
public class ControladorHolaMundo {
    
    public static MongoCollection<Document> collection;
    public static MongoDatabase database;
    public static MongoClient mongoClient;
    
    public static void main(String[] args) {
        Logger.getLogger("org.mongodb.driver").setLevel(Level.ALL);
        //String connectionString = System.getProperty("mongodb.uri");
        //mongodb://admin:admin@10.108.71.135:27017/sumas?authSource=admin
        //mvn compile exec:java -Dexec.mainClass="arcmop.blog.springbootest.configuracion.StartApplication"
       
    }
   
 
    @RequestMapping(value = "/sumar/{sum01}/{sum02}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Map saludar(@PathVariable("sum01") Integer sum01, @PathVariable("sum02") Integer sum02) {
        
        
        
        
       
        Map resultadototal= new LinkedHashMap();
        resultadototal.put("sumando1", String.valueOf(sum01));
        resultadototal.put("sumando2", String.valueOf(sum02));
        resultadototal.put("resultado", String.valueOf(sum01 + sum02));
        System.out.println("suma realizada  "+sum01+"+ "+sum02+ " = "+String.valueOf(sum01 + sum02));
        
        Document sumainput = new Document("_id", new ObjectId());      
        sumainput.put("sumando1", String.valueOf(sum01));
        sumainput.put("sumando2", String.valueOf(sum02));
        sumainput.put("resultado", String.valueOf(sum01 + sum02));
        sumainput.put("time", System.currentTimeMillis());
        try {
            
        mongoClient =  MongoClients.create("mongodb+srv://admin:admin@10.108.71.135:27017/sumas?authSource=admin"); 
        database= mongoClient.getDatabase("sumas");
        collection = database.getCollection("sumas");
        collection.insertOne(sumainput);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultadototal;
    }
    
    @RequestMapping(value = "/getall", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Map getall () {
         System.out.println("lista todos los componentes en la db");
         
        /*FindIterable<Document> iterable = collection.find(gte("resultado", "0"));        
        MongoCursor<Document> cursor = iterable.iterator();
        Map resultadototal= new LinkedHashMap();

        while (cursor.hasNext()) {
            resultadototal.put("value",cursor.next().toJson());
        }
*/
        return Collections.singletonMap("lista generica", "todos");
        //return resultadototal;
    }

}
