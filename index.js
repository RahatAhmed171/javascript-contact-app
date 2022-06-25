
const fs = require('fs');


const replace = require('replace-in-file');


class InfoAlreadyExistError extends Error {
    constructor(message) {
      super(message);
      this.name = "InfoAlreadyExistError";
    }
  }

  class InformationNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "InformationNotFoundError";
    }
  }

class ContactStorage{

    constructor(){
        this.storage_name='my_contacts.txt'
        this.contacts='kii'
        
    }
    //minor changes will happen

    initialize_storage(){
        throw new Error('You have to implement the method doSomething!');
    }
    create_a_contact(given_contact_infos){
        //name, number, email, address
        throw new Error('You have to implement the method doSomething!');
    }
    update_a_contact(contact_infos){
 throw new Error('You have to implement the method doSomething!');
    }
    search_contacts(given_query){
 throw new Error('You have to implement the method doSomething!');
    }
    delete_a_contact(contact){
 throw new Error('You have to implement the method doSomething!');
    }
    check_duplicate_contact(thing_to_check){
 throw new Error('You have to implement the method doSomething!');
    }
    sort_contacts(contacts){
        throw new Error('You have to implement the method doSomething!');
    }
 
 }
 
 class ContactFileStorage extends ContactStorage{
    

    initialize_storage(){
        try {
         
            let contacts_in_binary = fs.readFileSync(this.storage_name);
        
            let contacts_in_string=contacts_in_binary.toString()+"}"
           
            this.contacts=JSON.parse(contacts_in_string)
            
        } catch (error) {
            
            throw error
          }
        }
    



    create_a_contact(given_contact_infos){
        try{
        let contact_name=given_contact_infos['name']
        let contact_phone=given_contact_infos['phone']
       
        let is_duplicate_name=this.check_duplicate_contact({"name":contact_name})
        let is_duplicate_phone=this.check_duplicate_contact({"phone":contact_phone})
        if (is_duplicate_name || is_duplicate_phone){
            console.log("such contact exists")
            throw new InfoAlreadyExistError("Contact with such name or phone already exists");
        
        }

        else{
         
            let contact_infos_in_string=JSON.stringify(given_contact_infos)
            fs.appendFile(this.storage_name, `,"${contact_name.toUpperCase()}":${contact_infos_in_string}`, (err) => {
            if (err) {
                
                throw err
                }
        
            })
     }
    }
    catch(error){
        
        throw error
    }

    }




    update_a_contact(contact_infos){
        //the object gonna come in this format {"previous_name/phone":"value","new_name/phone":"value"}
        //since we dont know beforehand where its update for name or phone, we take value this way
        let previous_value=Object.values(contact_infos)[0]
        let new_value=Object.values(contact_infos)[1]
        let changed_value_in_object=''
        if(Object.keys(contact_infos)[1]=="new_name"){
            changed_value_in_object={"name":new_value}
        }
        else{
            changed_value_in_object={"phone":new_value}
        }
        //changed value will come as an object
        let is_duplicate=this.check_duplicate_contact(changed_value_in_object)
        try{
        if(is_duplicate){
            
            throw new InfoAlreadyExistError("Contact with such name or phone already exists");
        }
        else{
            let changed_value=Object.values(changed_value_in_object)[0]
            this.replace_strings_in_file(previous_value,changed_value)
        }
    }
    catch(err){
        throw err
    }
        



    }


    search_contacts(given_query=null){
        let matched_results=[]
        try{
        this.initialize_storage()
        
        
        
        
        
        const getAllKeys=Object.keys(this.contacts)
        if(given_query==null){
            for(let value of getAllKeys){
                if(value=="#####"){

                }
                else{
                matched_results.push(this.contacts[value])
                }
                
            }
            
        }
        else{
        let given_query_json=given_query['keyword']
        for(let value of getAllKeys){
            
            if(value.includes(given_query_json)|| this.contacts[value]['phone'].includes(given_query_json)){
                matched_results.push(this.contacts[value])
            }
            
        }
        if(matched_results.length==0){
            throw new InformationNotFoundError(`Contact with "${given_query_json}" does not exist`)
        }
    }
        let sorted_contacts=this.sort_contacts(matched_results)
        return sorted_contacts
}
catch(error){
    throw error
}

    }



    delete_a_contact(contact){

        let the_contact_to_be_deleted=contact["contact_to_delete"].toUpperCase()
        try{
        this.replace_strings_in_file(the_contact_to_be_deleted,"#####")
        }
        catch(error){
            throw error
        }
    }

    check_duplicate_contact(thing_to_check){
        try{
        this.initialize_storage()
        const getAllKeys = Object.keys(this.contacts);
        let found=false
        if (Object.keys(thing_to_check)[0]=="name"){
            let given_name=thing_to_check["name"].toUpperCase()
            for (let a_key of getAllKeys) {
                if(given_name==a_key){
                    
                    return true
               }
            }
            if(found==false){
                return false
            }
           
        }

        else{
            for (let a_key of getAllKeys){

                if(thing_to_check["phone"]===this.contacts[a_key]["phone"]){
                    return true
                }
            }
            if(found==false){
                return false
            }
            
        }
    }
    catch(error){
        throw error
    }
           }



    sort_contacts(contacts){
        contacts.sort(function(a,b){
            if(a.name.toLowerCase()<b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase()>b.name.toLowerCase()){
                return 1
            }
            return 0
        }
            )
        return contacts
    }
    replace_strings_in_file(previous_string,changed_string){

        //let previous_string_with_expression=previous_string
        let the_regex_string=new RegExp(previous_string,'g')
        
        

        const replace_settings = {

            //Single file
            files: this.storage_name,
          
           
          
            //Replacement to make (string or regex) 
            from:the_regex_string,
            to:changed_string,
          };

        
          try {
            replace.sync(replace_settings);
          
          }
          catch (error) {
            
            throw error
          }
        
    }
    
 }

 let Contact_Manager=new ContactFileStorage()

module.exports=Contact_Manager




