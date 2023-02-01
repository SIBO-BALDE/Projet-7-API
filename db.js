//importer sqlite3 et verbose()vas nous permettre d'avoir plusieurs informations sur les erreurs 1
const sqlite3=require("sqlite3").verbose()

//déclarer le fichier de notre base de donnée 2
 const dbFile="db.sqlite"

 //Se connecter à la base de donnée on met le fichier dbFile et un callback()3
 let db=new sqlite3.Database(dbFile,(err)=>{
//Aprés on fait un cheking ou verification de notre connexion au base de donnée 4
if(err){
    console.error(err.message)
    //si ya une erreur l'application doit se fermer par throw err 5
    throw err
}else{
    //sinon on met connexion à la base de donnée 6
console.log("connexion a la base de donnée sqlite3...");
}
//Creer une table avec la requete CREATE TABLE 8
const sql=` CREATE TABLE article(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre text,
    resume text,
    contenu text,
    auteur text,
    dateCreation text,
    dateMisAJour text
)`
//Pour interagir avec la base de donnée on utilise la commande run  la commande prend la requete sql dabort et ensuit un callback 7
db.run(sql,(err)=>{
    //on va faire une cheking pour voir s'il ya erreur ou pas 9
    if(err){
        //logger Table dejas creer s'il ya err 10
        console.log(err)
        
    }
})



 })
 module.exports=db;