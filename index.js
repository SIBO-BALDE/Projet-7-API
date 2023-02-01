// importer expressjs 1
const express = require('express');

//Utiliser notre table qu'on a creer sur db.js 7
const db= require('./db.js');


// creer une application expressjs 2
const app = express()

// middleware :Des fonctions qui s'éxecutent avant l'application marche:urlencoded 7
app.use(express.urlencoded({extended:false}))
app.use(express.json());


// declarer une port 3
const PORT =3000


//Creer  notre premier endpoint avec get 6
app.get("/",function(req,res){
    res.json({message:"L'API  marche bien"})
    })


//Lister les articles 20

app.get("/apir/articles", (req, res)=>{
   
//selectionner ou afficher tout les contacts 21
    const sql="SELECT * FROM article"
    db.all(sql, (err, rows)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;  
        }
        res.json({message:"listes des articles",data:rows}) 
    });
});



//Afficher une article par son ID 22

app.get("/apir/articles/:id", (req, res)=>{
    const {id:articleID}=req.params;

    //selectionner ou afficher tout les contacts 23
        const sql="SELECT * FROM article WHERE id=?"
        const params=[articleID];
        db.get(sql, params,(err, row)=>{
            if(err){
                res.status(400).json({error:err.message});
                return;  
            }
            res.json({message:`Afficher l'article ${articleID}`,data:row});
        });
    });




    //Creer des articles avec endpoint post 8
    app.post("/apir/articles", (req, res)=>{

//pour creer un article on abesoin d'un check ou verification pour voir si la personne a mis tout les informations demandées 10
        const { titre, resume, contenu, auteur, dateCreation, dateMisAJour}=req.body

//si l'utilisateur n'a pas renseigner tout ces informations 11
        if(!titre || !resume || !contenu || !auteur || !dateCreation || !dateCreation || !dateMisAJour ){

            //renvoyer  ou retourner un message d'erreur 400 "merci de remplir tous les champs indiqués"12
            res.status(400).json({error:"merci de remplir tous les champs indiqués!"});
            return;
        }


//Creer un article avec un object(clé valeur) mais vue que le nom de la clé et la valeur sont meme valeur on donne que la clé exemple:titre:titre  => titre 13
         const article={titre,resume,contenu,auteur,dateCreation,dateMisAJour};


// on va inserer des valeurs dans notre table article donc on utilise la requete INSERT INTO de sql 14
        const sql= 'INSERT INTO article(titre,resume,contenu,auteur,dateCreation,dateMisAJour) VALUES(?,?,?,?,?,?)';

//On va donner les parametre de la table article en inserant un tableau 15
        const params=[article.titre, article.resume, article.contenu, article.auteur, article.dateCreation, article.dateMisAJour]

//On va executer avec la commande run qui nous permet  d'interagir avec la base de donnée 16 
    db.run(sql, params, function(err, result){
    //si ya une erreur sa retourne un message d'erreur de type 400 17
      if(err){
        res.status(400).json({error:err.message});
        return; 
        //sinon on retourne une reponse de type 201 :article creer avec succée 18
     }else{
 //afficher création d'article 9
 //res.json({message:"vous avez creer un article"});etape 9
 res.status(201).json({message:"article creer avec succée",data:article });//data:article envoyer les données 19
    }

    });  

    });







//Modifier un article 24

 app.put("/apir/articles/:id", (req, res)=>{
    const {id:articleID}=req.params;


    //pour modifier  un article on abesoin d'un check ou verification pour voir si la personne a mis tout les informations demandées 25
            const { titre, resume, contenu, auteur, dateCreation, dateMisAJour}=req.body
    
    //si l'utilisateur n'a pas renseigner tout ces informations 26
            if(!titre || !resume || !contenu || !auteur || !dateCreation || !dateCreation || !dateMisAJour ){
    
                //renvoyer  ou retourner un message d'erreur 400 "merci de remplir tous les champs indiqués"27
                res.status(400).json({error:"merci de remplir tous les champs indiqués!"});
                return;
            }
    
    
    //Modifier un article avec un object(clé valeur) mais vue que le nom de la clé et la valeur sont meme valeur on donne que la clé exemple:titre:titre  => titre 28
             const article={titre,resume,contenu,auteur,dateCreation,dateMisAJour};
    
    
    // on va mettre à jour des valeurs dans notre table article donc on utilise la requete UPDATE SET de sql 29
            const sql= 'UPDATE article SET titre=?, resume=?, contenu=?, auteur=?, dateCreation=?, dateMisAJour=? WHERE id=?';
    
    //On va donner les parametre de la table article en modifiant le  tableau 30
            const params=[article.titre, article.resume, article.contenu, article.auteur, article.dateCreation, article.dateMisAJour,articleID]
    
    //On va executer avec la commande run qui nous permet  d'interagir avec la base de donnée 31
        db.run(sql, params, function(err, result){
        //si ya une erreur sa retourne un message d'erreur de type 400 32
          if(err){
            res.status(400).json({error:err.message});
            return; 
            //sinon on retourne une reponse de type 201 :article creer avec succée 33
         }else{
     //afficher le message de type 201 article modifier avec succée 34
     
     res.status(201).json({message:`article ${articleID} modifier avec succée`,data:article });//data:article envoyer les données 35
        }
    
        });  
    
        });
    




//Supprimer un article (Delete an artcle) 36
app.delete("/apir/articles/:id", (req, res)=>{
    //Recuperer l'ID 37
    const {id:articleID}=req.params;
    const sql="DELETE FROM article WHERE id=?"

    //On va executer avec la commande run qui nous permet  d'interagir avec la base de donnée 38
    db.run(sql, articleID, function(err, result){

//si ya une erreur sa retourne un message d'erreur de type 400 39
        if(err){
            res.status(400).json({error:err.message});
            return; 
            
         }
     //afficher le message  article supprimer avec succée 40
     
     res.json({message:`article ${articleID} supprimer avec succée`,data: this.changes });//data:article envoyer les données 41
        


    })
})




//démarer le serveur 4
app.listen(PORT ,function() {
    //on peut utiliser ces deux methodes celle commenté et le suivant 5
    // console.log("l'application est démarer au port:"+ PORT)
    console.log(`l'application est démarer au port:${PORT}`);

})

