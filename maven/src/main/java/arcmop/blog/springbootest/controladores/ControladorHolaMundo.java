package arcmop.blog.springbootest.controladores;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class ControladorHolaMundo {
    
   @Value("${app.mongodb-server}")
   private String mongodb_server;
       
   @Value("${app.mongodb-port}")
   private int mongodb_port;
   
   @Value("${app.mongodb-db}")
   private String mongodb_database;
   
 
    MongoClient mongoClient = new MongoClient(mongodb_server, mongodb_port);
    DB database = mongoClient.getDB(mongodb_database);
   

    @RequestMapping(value = "/sumar/{sum01}/{sum02}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Map saludar(@PathVariable("sum01") Integer sum01, @PathVariable("sum02") Integer sum02) {
        
        Map resultadototal= new LinkedHashMap();
        resultadototal.put("sumando1", String.valueOf(sum01));
        resultadototal.put("sumando2", String.valueOf(sum02));
        resultadototal.put("resultado", String.valueOf(sum01 + sum02));
        System.out.println("suma realizada  "+sum01+"+ "+sum02+ " = "+String.valueOf(sum01 + sum02));
        
       /* DBCollection collection = database.getCollection("sumas");
        BasicDBObject document = new BasicDBObject();
        document.put("sumando1", String.valueOf(sum01));
        document.put("sumando2", String.valueOf(sum02));
        document.put("resultado", String.valueOf(sum01 + sum02));
        document.put("time", System.currentTimeMillis());

        collection.insert(document);
    */
        return resultadototal;
    }
    
     @RequestMapping(value = "/getall", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Map getall () {
         System.out.println("lista todos los componentes en la db");
         
       /* BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put("", "");
        DBCollection collection = database.getCollection("sumas");
        DBCursor cursor = collection.find(searchQuery);
 
        while (cursor.hasNext()) {
            System.out.println(cursor.next());
        }
*/
        return Collections.singletonMap("lista generica", "todos");
    }

}
