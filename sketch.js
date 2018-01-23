//Per migliorare le performance!
p5.disableFriendlyErrors = true;

var mobile=false;
var desktop=true;

var debug=true;
var lowRes=false;
var targetFrameRate=60;

//BOUNDING
var spriteBoundingBox;

//TERRA
var spriteTerra;
var spriteMontagna;

//ACQUA
var acquaMeter=60;
var velocitaAcquaScende=.5;
var velocitaAcquaSale=5;

var spriteAcqua=Array();
var spriteGhiaccio=Array();
var spriteAnimazioneProva=Array();
var soglieAcqua=[20,40,60,80,100]

var numeroTransizioniGhiaccio=5;
var livelloGhiaccio=0;

//ANIMALI
var spriteVolpe=Array();
var spriteLontra=Array();
var spritePesce=Array();

var volpiCreate=0;
var volpiVive=0;
var volpiTarget=4;

var lontreCreate=0;
var lontreVive=0;
var lontreTarget=4;

var pesciCreati=0;
var pesciVivi=0;
var pesciTarget=4;



//TEMPERATURA
var temperaturaMeter=25;
var indicatoriTemperatura=Array();
var spriteIndicatoreFreddo;
var spriteIndicatoreCaldo;
var modificatoreCambioTemperatura=0.15;

//VENTO
var microfono;
var sogliaSuonoUdibile=0.5;
var tempoTraSoffi=1;
var timerSoffi=0.0;
var volumeMicrofono=0;
var hasBlown=false;
var numSoffi=0;
var isRaining=false;
var isSnowing=false;
var spriteNuvole=Array();
var nuvole=Array();

var spritePioggia=Array();
var pioggiaObj;
var spriteNeve=Array();
var neveObj;


 

//GIORNO/NOTTE
var catturaWebcam;
var immagineWebcam;
var luminositaWebcam=0;
var luminositaWebcamOldFrame;
var sogliaSensoreLuminosita=10;
var orologioMeter=100;
var velocitaCambioGiornoNotte=.5;
var spriteSole;
var spriteLuna;
var coloreGiorno;
var coloreNotte;
var daQuantiSecondiDuraLaNotte=0;
var daQuantiSecondiDuraIlGiorno=0;
var isGiorno=false;


//ALBERI
var spriteAlberi=Array();
var alberi=Array();
var posizioniAlberi=Array();

//CREATURE
var creature=Array();



//TERREMOTO
var shakeMeter=0;
var shakeMeterVelocitaPerTornareAZero=4;
var shakeMeterSogliaMassima=10;
var shakeIncremento=1;
var shakePotenza=10 ;
var shakeAttivo=false;
var shakeFranato=false;

//FUMETTI
var spriteNuvolettaFumetto;
var arrayNuvoletteFumetto=Array();
var spritePittogrammi=Array();

//SUONI
var suonoPop;
var suonoNotte;
var suonoGiorno;
var suonoPioggia;
var suonoFrana;

var dimensioneMinoreLato;
var dimensioneMinore;
var deltaTime=0;
var animazioniInCorso=Array();
var spriteEsplosione=Array();
var spriteSfumatura;

var animazioneProva;
var velocitaAnimazioneProva=10;

var inizializzato=false;
var timerInizializzato=0;
var currentFPS=0;

function preload()
{
  
  listaPosizioni = loadJSON("assets/Posizioni.json");

  spriteIndicatoreCaldo=loadImage("assets/Pittogrammi/fiamma.png");
  spriteIndicatoreFreddo=loadImage("assets/Pittogrammi/fiocco.png");
 
  spriteSole=loadImage("assets/Sole.png");
  spriteLuna=loadImage("assets/Luna.png");

  spriteBoundingBox=loadImage("assets/BoundingBox.png");

  spriteTerra=loadImage("assets/Terra.png");
  spriteMontagna=loadImage("assets/Montagna.png");

  spriteNuvolettaFumetto=loadImage("assets/NuvolettaFumetto.png");

  for(var i=0;i<=3;i++)
    {
      var pezzoAcqua=new PezzoAcqua();
      for(var j=0;j<numeroTransizioniGhiaccio;j++)
      {
        pezzoAcqua.ghiacciato.push(loadImage("assets/AcquaCroppata/Acqua_"+i+"_"+j+".png"));
      }
      spriteAcqua.push(pezzoAcqua);
      pezzoAcqua=null;

    }

  for(var i=0;i<=9;i++)
  spritePioggia.push(loadImage("assets/Pioggia/Pioggia_"+i+".png"));

  for(var i=0;i<=9;i++)
  spriteNeve.push(loadImage("assets/Neve/Neve_"+i+".png"));

  for(var i=0;i<=3;i++)
  spriteGhiaccio.push(loadImage("assets/Ghiaccio_"+i+".png"));

  for(var i=0;i<=4;i++)
  spriteAnimazioneProva.push(loadImage("assets/AnimazioneProva_"+i+".png"));

  for(var i=0;i<=4;i++)
  spriteEsplosione.push(loadImage("assets/Esplosione/Animazione_Esplosione_"+i+".png"));

  for(var i=0;i<=6;i++)
  spritePittogrammi.push(loadImage("assets/Pittogrammi/Pittogramma_"+i+".png"));

  for(var i=0;i<=1;i++)
  spriteVolpe.push(loadImage("assets/Animali_Volpe_"+i+".png"));

  for(var i=0;i<=2;i++)
  spriteLontra.push(loadImage("assets/Animali_Lontra_"+i+".png"));

  for(var i=0;i<=1;i++)
  spritePesce.push(loadImage("assets/Animali_Pesce_"+i+".png"));

  for(var i=0;i<=3;i++)
  spriteAlberi.push(loadImage("assets/Albero_"+i+".png"));

  spriteNuvole.push(loadImage("assets/Luna.png"));


  //SUONI
  suonoPop=loadSound("assets/Suoni/Pop.wav");
  suonoPop.setVolume(0.03);
  suonoNotte=loadSound("assets/Suoni/SuonoNotte.mp3");
  

  

  spriteSfumatura=(loadImage("assets/Sfumatura.png"));

}

function setup() {
    createCanvas(windowWidth,windowHeight);
    setDimensioneMinore();
    imageMode(CENTER);
    frameRate(targetFrameRate);

    

    //INIZIALIZZA WEBCAM
    catturaWebcam=createCapture(VIDEO);
    catturaWebcam.size(200,200);
    catturaWebcam.hide();

    //INIZIALIZZA MICROFONO
    microfono=new p5.AudioIn();
    microfono.start();
 
    //Carica JSON creature
    for (var i = 0; i < listaPosizioni.creature.length; i++) {
      var datiCreatura=listaPosizioni.creature[i];
      var creatura=new Creatura(datiCreatura.tipoCreatura,datiCreatura.x,datiCreatura.y,datiCreatura.habitat)
      creature.push(creatura);

      
      switch(creatura.tipoCreatura)
      {
        case "volpe": creatura.assegnaIndiceCreatura(volpiCreate);
                      volpiCreate++;
                      break;
        
        case "lontra": creatura.assegnaIndiceCreatura(lontreCreate);
                      lontreCreate++;
                      break;
                      
        case "pesce": creatura.assegnaIndiceCreatura(pesciCreati);
                      pesciCreati++;
                      break;
        
        default:break;

      }

      
    }


    for (var i = 0; i < listaPosizioni.indicatoriTemperatura.length; i++) {
      var datiJSON=listaPosizioni.indicatoriTemperatura[i];
    indicatoriTemperatura.push(new IndicatoreTemperatura(datiJSON.x,datiJSON.y));
    }

    for (var i = 0; i < listaPosizioni.posizioniNuvole.length; i++) {
      var datiJSON=listaPosizioni.posizioniNuvole[i];
    nuvole.push(new Nuvola(datiJSON.x1,datiJSON.y1,datiJSON.x2,datiJSON.y2,datiJSON.x3,datiJSON.y3));
    }
   
 


    //Performance optimization

    if(lowRes)
    {
      for(var i=0;i<=3;i++)
      for(var j=0;j<numeroTransizioniGhiaccio;j++)
      spriteAcqua[i].ghiacciato[j].resize(50,50);

      spriteNuvolettaFumetto.resize(50,50);

      spriteTerra.resize(100,100);
      spriteVolpe[0].resize(100,100);

      for(var i;i<spritePittogrammi.length;i++)
      spritePittogrammi[i].resize(50,50);
      for(var i;i<spriteAnimazioneProva.length;i++)
      spriteAnimazioneProva[i].resize(50,50);
    }

    coloreGiorno=color("#8084ff");
    coloreNotte=color("#10112b");

    //SUONI
    suonoNotte.setLoop(true);

    pioggiaObj=new Animazione(spritePioggia,0.5,0.5,1,1,.5,true);
    pioggiaObj.setPlay(false);

    neveObj=new Animazione(spriteNeve,0.5,0.5,1,1,1,true);
    neveObj.setPlay(false);
    
    
  }
  
function draw() {
 

  
  if(timerInizializzato<2)
  timerInizializzato++;
  else
  inizializzato=true;

    if(!inizializzato)
    return;

  deltaTime=1/frameRate();
  if(deltaTime>.5)
  deltaTime=.5;

  background(lerpColor(coloreNotte, coloreGiorno, orologioMeter/100) );
//background(orologioMeter*2.55);



//INIZIO
push();
//Terremoto
if(shakeMeter>0)
  {
  translate(random()*shakePotenza*shakeMeter, random()*shakePotenza*shakeMeter);
  shakeMeter-=deltaTime*shakeMeterVelocitaPerTornareAZero;
  }
  else
  {
  shakeMeter=0;
  }


//Luminosita
//Per questioni di performance non chiamiamola ogni ciclo
if(frameCount%30==0)
prendiLuminositaWebcam();

orologioMeter=lerp(orologioMeter,luminositaWebcam,deltaTime*velocitaCambioGiornoNotte);

if(orologioMeter>50)
{
  isGiorno=true;
  if(daQuantiSecondiDuraLaNotte!=0.0)
  daQuantiSecondiDuraLaNotte=0.0;
  daQuantiSecondiDuraIlGiorno+=deltaTime;
}
else
{
  isGiorno=false;
  if(daQuantiSecondiDuraIlGiorno!=0.0)
  daQuantiSecondiDuraIlGiorno=0.0;
  daQuantiSecondiDuraLaNotte+=deltaTime;
}


var posizioneSole=(100-orologioMeter)/100;
var posizioneLuna=(orologioMeter)/100;

image(spriteSole,xNormalizzata(.2),yNormalizzata(.1+posizioneSole*.8),dimensioneNormalizzata(0.1),dimensioneNormalizzata(0.1));
image(spriteLuna,xNormalizzata(.8),yNormalizzata(.1+posizioneLuna*.8),dimensioneNormalizzata(0.1),dimensioneNormalizzata(0.1));

//Microfono
prendiVolumeMicrofono();


//SFUMATURA

push();
tint(lerpColor(coloreNotte, coloreGiorno, orologioMeter/100));
image(spriteSfumatura, xNormalizzata(0.5), yNormalizzata(0.5), dimensioneNormalizzata(1), dimensioneNormalizzata(1));
pop();

//TerraBase
image(spriteTerra,xNormalizzata(.5),yNormalizzata(.5), dimensioneMinore,dimensioneMinore);


//Montagna
image(spriteMontagna,xNormalizzata(.5),yNormalizzata(.5), dimensioneMinore,dimensioneMinore);

//Acqua
if(isRaining)
{
  acquaMeter+=deltaTime*velocitaAcquaSale;
}
else
{
  var modificatoreTemperatura=1;
  if(temperaturaMeter>25)
  modificatoreTemperatura=map(temperaturaMeter,25,50,0,10);

  acquaMeter-=deltaTime*velocitaAcquaScende*modificatoreTemperatura;
}

//acquaMeter=(mouseX/width)*100;
acquaMeter=constrain(acquaMeter, 0,100);
var scalaAcqua=dimensioneNormalizzata(0.46);
var scalaAcquaY=0.824*scalaAcqua;
var posizioneAcquaX=xNormalizzata(0.448);
var posizioneAcquaY=yNormalizzata(0.6);
if(acquaMeter<soglieAcqua[0])
  {
   
  }
  else
  if(acquaMeter>=soglieAcqua[0] && acquaMeter<soglieAcqua[1])
  {
    push();
    tint(255,map(acquaMeter,soglieAcqua[0],soglieAcqua[1],0,255));
    image(spriteAcqua[0].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY,scalaAcqua,scalaAcquaY);
    pop();
  }
  if(acquaMeter>=soglieAcqua[1] && acquaMeter<soglieAcqua[2])
  {
    image(spriteAcqua[0].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    push();
    tint(255,map(acquaMeter,soglieAcqua[1],soglieAcqua[2],0,255));
    image(spriteAcqua[1].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    pop();
  }
  if(acquaMeter>=soglieAcqua[2] && acquaMeter<soglieAcqua[3])
  {
    image(spriteAcqua[1].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    push();
    tint(255,map(acquaMeter,soglieAcqua[2],soglieAcqua[3],0,255));
    image(spriteAcqua[2].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    pop();
  }
  if(acquaMeter>=soglieAcqua[3] && acquaMeter<=soglieAcqua[4])
  {
    image(spriteAcqua[2].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    push();
    tint(255,map(acquaMeter,soglieAcqua[3],soglieAcqua[4],0,255));
    image(spriteAcqua[3].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    pop();
  }


 



  //CREATURE
  volpiVive=0;
  for(var i=0;i<creature.length;i++)
  {
    
    if(creature[i].tipoCreatura=="volpe" && !creature[i].morto)
    {
      volpiVive++;
    }

    creature[i].update();
  }
 

  for(var i=0;i<animazioniInCorso.length;i++)
  animazioniInCorso[i].update();

  for(var i=0;i<nuvole.length;i++)
  nuvole[i].update();

  for(var i=0;i<arrayNuvoletteFumetto.length;i++)
  arrayNuvoletteFumetto[i].update();

  for(var i=0;i<indicatoriTemperatura.length;i++)
  indicatoriTemperatura[i].update(); 


//image(spriteBoundingBox, width/2,height/2,dimensioneMinore,dimensioneMinore);

//FINE
pop();



if(debug)
  {
    fill(255);
    

    var mouseXnormalizzata=(mouseX-((width-dimensioneMinore)/2))/dimensioneMinore;
    var mouseYnormalizzata=(mouseY-((height-dimensioneMinore)/2))/dimensioneMinore;
    text("X="+mouseXnormalizzata.toFixed(2)+" Y="+mouseYnormalizzata.toFixed(2), mouseX, mouseY);

    var interlinea=10;
   
    if(frameCount%15==0)
    currentFPS=frameRate().toFixed();

    text("FPS= "+currentFPS,10,interlinea);
    interlinea+=20;
    text("AcquaMeter= "+acquaMeter.toFixed(2),10,interlinea);
    interlinea+=20;
    text("ShakeMeter= "+shakeMeter.toFixed(2),10,interlinea);
    interlinea+=20;
    text("Temperatura= "+temperaturaMeter.toFixed(2),10,interlinea);
    interlinea+=20;
    text("LuminositaWebcam= "+luminositaWebcam.toFixed(2),10,interlinea);
    interlinea+=20;
    text("Orologio= "+orologioMeter.toFixed(2),10,interlinea);
    interlinea+=20;
    text("Microfono= "+volumeMicrofono.toFixed(2),10,interlinea);
    interlinea+=20;
    text("Soffi= "+numSoffi,10,interlinea);
    interlinea+=20;
    text("Volpi= "+volpiVive,10,interlinea);
    interlinea+=20;
    text("Notte= "+daQuantiSecondiDuraLaNotte.toFixed(1),10,interlinea);
    interlinea+=20;
    text("Giorno= "+daQuantiSecondiDuraIlGiorno.toFixed(1),10,interlinea);
    
  }

  gestisciSuoni();

}

function IndicatoreTemperatura(x,y)
{

  this.x=x;
  this.y=y;

  this.movimentoSuGiu=.007;
  this.movimentoSuGiuActual=0;
  this.velocitaMovimentoSuGiu=.001;
  this.velocitaIngrandimento=10;
  this.size=.05;
  this.actualSize=this.size;
  this.sprite;

  this.update=function()
  {
    push();

    if(temperaturaMeter>0)
    this.sprite=spriteIndicatoreCaldo;
    else
    this.sprite=spriteIndicatoreFreddo;

    this.actualSize=lerp(this.actualSize, abs(temperaturaMeter/50),deltaTime*this.velocitaIngrandimento);
    this.movimentoSuGiuActual=sin(millis()*this.velocitaMovimentoSuGiu)*this.movimentoSuGiu;
    image(this.sprite,xNormalizzata(this.x),yNormalizzata(this.y+this.movimentoSuGiuActual),dimensioneNormalizzata(this.actualSize*this.size),dimensioneNormalizzata(this.actualSize*this.size));
    pop();
  }
}

function PezzoAcqua()
{
  this.ghiacciato=Array();
}

function Posizione(x,y)
{
  this.x=x;
  this.y=y;
}


function NuvolettaFumetto(x,y,tipoFumetto,owner)
{
  arrayNuvoletteFumetto.push(this);

  this.x=x;
  this.y=y;
  this.owner=owner;
  this.isDead=false;
  this.isCreating=true;
  this.isWaiting=false;
  this.isDisappearing=false;
  this.scala=0;
  this.velocitaLerp=3;
  this.lifeTime=1;
  this.timerLifeTime=0;
  this.spritePittogramma=spritePittogrammi[0];
  this.tempoPrimaDiPoterRiparlare=3;

  this.maxSize=dimensioneNormalizzata(0.03);
  this.maxSizePittogramma=this.maxSize*.38;


  switch(tipoFumetto)
  {
    case "caldo":this.spritePittogramma=spritePittogrammi[0];break;
    case "freddo":this.spritePittogramma=spritePittogrammi[1];break;
    case "notte":this.spritePittogramma=spritePittogrammi[2];break;
    case "morte":this.spritePittogramma=spritePittogrammi[3];break;
    case "acqua":this.spritePittogramma=spritePittogrammi[4];break;
    case "giorno":this.spritePittogramma=spritePittogrammi[5];break;
    case "spavento":this.spritePittogramma=spritePittogrammi[6];break;

    default:break;
  }
 
  this.ratioSprite=this.spritePittogramma.height/this.spritePittogramma.width;

  this.update=function()
  { 
    if(this.isDead)
    return;

    if(this.isCreating)
    {
      if(this.scala<1)
      this.scala=lerp(this.scala,1.1,deltaTime*this.velocitaLerp);
      else
      {
        this.isCreating=false;
        this.isWaiting=true;
      }
    }
    else if(this.isWaiting)
    {
      if(this.timerLifeTime<this.lifeTime)
      this.timerLifeTime+=deltaTime;
      else
      {
        this.isWaiting=false;
        this.isDisappearing=true;
      }
    

    }


    if(this.isDisappearing)
    {
      if(this.scala>0)
      this.scala=lerp(this.scala,-.1,deltaTime*this.velocitaLerp);
      else
      {
        this.isDisappearing=false;
        this.isDead=true;
        this.owner.canTalkAgain();
      }
    }

    push();
    image(spriteNuvolettaFumetto,xNormalizzata(this.x),yNormalizzata(this.y-.04),this.maxSize*this.scala,this.maxSize*this.scala);
    image(this.spritePittogramma,xNormalizzata(this.x),yNormalizzata(this.y-.042),this.maxSizePittogramma*this.scala,this.maxSizePittogramma*this.scala*(this.ratioSprite));
    pop();
  }
}


function Creatura(tipoCreatura,x,y,habitat)
{
  this.x=x;
  this.y=y;
  this.indiceCreatura=0;
  this.indiceCreatura;
  this.tipoCreatura=tipoCreatura;
  this.habitat=habitat;
  this.spriteCreatura;
  this.velocitaCrescita=.005;
  this.sfortunato=false;
  this.dovrebbeMorire=false;
  this.dovrebbeNascere=false;
  this.tempoPrimaDiPoterRiparlare=3.0;
  this.canTalkTimer=0.0;
  this.startCanTalkTimer=false;

  this.sogliaAcquaMortale;
  this.sogliaAcquaPericolo;
  this.sogliaAcquaRinasce;

  this.caldo=0;
  this.tolleranzaCaldo=10;

  this.tolleranzaGiorno=6;
  this.tolleranzaNotte=6;


  switch(tipoCreatura)
  {
    case "albero":
                  this.size=0.08;
                  this.spriteCreatura=random(spriteAlberi);
                  
    break;

    case "volpe":
                this.size=0.04;
                this.spriteCreatura=random(spriteVolpe);
    break;

    case "lontra":
                this.size=0.04;
                this.spriteCreatura=random(spriteLontra);
    break;

    case "pesce":
                this.size=0.04;
                this.spriteCreatura=random(spritePesce);
                this.velocitaCrescita=.05;

                if(this.habitat=="mareLivello1")
                {
                  this.sogliaAcquaMortale=30;
                  this.sogliaAcquaPericolo=35;
                  this.sogliaAcquaRinasce=40;
                }
                else
                if(this.habitat=="mareLivello2")
                {
                  this.sogliaAcquaMortale=50;
                  this.sogliaAcquaPericolo=55;
                  this.sogliaAcquaRinasce=60;
                }
                else
                if(this.habitat=="mareLivello3")
                {
                  this.sogliaAcquaMortale=70;
                  this.sogliaAcquaPericolo=75;
                  this.sogliaAcquaRinasce=80;
                }
                else
                if(this.habitat=="mareLivello4")
                {
                  
                  this.sogliaAcquaMortale=90;
                  this.sogliaAcquaPericolo=95;
                  this.sogliaAcquaRinasce=99;
                }
    break;

    default:
    break;
    

                
  }
  this.actualSize=this.size;
  this.ratio=this.spriteCreatura.height/this.spriteCreatura.width;
  this.morto=false;
  this.isGrowning=false;
  this.canTalk=true;

  
  this.update=function()
  {
    this.dovrebbeMorire=false;
    this.dovrebbeNascere=false;
    push();
    //ALBERI===================================
    if(this.tipoCreatura=="albero")
    {
      if(this.habitat=="spiaggia")
      {
        if(acquaMeter>90)
        this.muori();
        else if(acquaMeter>70)
        this.fumetto("morte");
        else
        this.nasci();

      }

      if(acquaMeter<soglieAcqua[0])
      {
        this.fumetto("acqua");
      }
    }
    else
    //VOLPI====================================
    if(this.tipoCreatura=="volpe")
    {
      if(random()<.5)
      if(frameCount%100==0)
      this.spriteCasuale(spriteVolpe);

      if(shakeMeter>5)
      this.fumetto("spavento");

      if(daQuantiSecondiDuraLaNotte>this.tolleranzaNotte)
      this.fumetto("notte");
      if(daQuantiSecondiDuraIlGiorno>this.tolleranzaGiorno)
      this.fumetto("giorno");
    }
    else
    //LONTRE
    if(this.tipoCreatura=="lontra")
    {

      if(random()<.5)
      if(frameCount%120==0)
      this.spriteCasuale(spriteLontra);

      if(this.sfortunato)
        {
          if(temperaturaMeter<=-30)
          {
            this.dovrebbeMorire=true;
          }
          else
          if(temperaturaMeter<-10)
          {
            this.fumetto("freddo");
            this.dovrebbeNascere=false;
          }
        }
    }
    //PESCI===================================
    if(this.tipoCreatura=="pesce")
    {
      if(random()<.5)
      if(frameCount%140==0)
      this.spriteCasuale(spritePesce);

        if(acquaMeter>this.sogliaAcquaRinasce)
        this.dovrebbeNascere=true;

        if(acquaMeter<this.sogliaAcquaMortale)
        {
            this.dovrebbeMorire=true;
        }
        else
        if(acquaMeter<this.sogliaAcquaPericolo)
        {
            this.fumetto("spavento");
        }

        if(this.sfortunato)
        {
          if(temperaturaMeter<=-30)
          {
            this.dovrebbeMorire=true;
          }
          else
          if(temperaturaMeter<-10)
          {
            this.fumetto("freddo");
            this.dovrebbeNascere=false;
          }
        }

        
    

    }

    if(this.dovrebbeMorire && this.dovrebbeNascere)
    {
      this.muori();
    }
    else
    if(this.dovrebbeMorire)
    {
      this.muori();
    }
    else
    if(this.dovrebbeNascere)
    {
      this.nasci();
    }

    if(!this.morto)
    {
      if(this.isGrowning)
      {
        if(this.actualSize<=this.size)
        this.actualSize+=deltaTime*this.velocitaCrescita;
        else
        {
          this.actualSize=this.size;
          this.isGrowning=false;
        }
      }

      if(this.startCanTalkTimer)
      this.canTalkTimer+=deltaTime;
      if(this.canTalkTimer>=this.tempoPrimaDiPoterRiparlare)
      {
        this.canTalkTimer=0;
        this.canTalk=true;
        this.startCanTalkTimer=false;
      }

      image(this.spriteCreatura,xNormalizzata(this.x),yNormalizzata(this.y),dimensioneNormalizzata(this.actualSize),dimensioneNormalizzata(this.actualSize*this.ratio));
    }
      pop();
  }

  this.muori=function()
  {
    if(this.morto)
    return;

    //Allo start-up non fare rumore
    if(frameCount>120)
    {
      suonoPop.play();
      new Animazione(spriteEsplosione,this.x,this.y,.05,.05,.05,false);
    }
      this.morto=true;
    this.actualSize=0;
  }
  this.nasci=function()
  {
    if(this.morto)
    {
    this.morto=false;
    this.isGrowning=true;
    }
  }

  this.fumetto=function(tipoFumetto)
  {
    if(!this.morto && this.canTalk)
    {
    this.canTalk=false;
    new NuvolettaFumetto(this.x,this.y,tipoFumetto,this);
    }
  }

  this.canTalkAgain=function()
  {
    this.startCanTalkTimer=true;
    //this.canTalk=true;
  }

  this.assegnaIndiceCreatura=function(id)
  {
    this.indiceCreatura=id;
    this.sfortunato=id%2!=0;
 
  }

  this.spriteCasuale=function(arraySprite)
  {
    this.spriteCreatura=random(arraySprite);
  }
}


function Nuvola(x1,y1,x2,y2,x3,y3)
{
  this.x1=x1;
  this.x2=x2;
  this.x3=x3;
  this.y1=y1;
  this.y2=y2;
  this.y3=y3;

  this.x=this.x1;
  this.y=this.y1;

  this.targetX=this.x;
  this.targetY=this.y;

  this.isEntering=false;
  this.isExiting=false;



  this.size=0.1;
  this.actualSize=0.001;
  this.targetSize=this.actualSize;

  this.velocitaLerp=3;

  this.spriteNuvola=random(spriteNuvole);

  this.update=function()
  {

    this.x=lerp(this.x,this.targetX,deltaTime*this.velocitaLerp);
    this.y=lerp(this.y,this.targetY,deltaTime*this.velocitaLerp);
    this.actualSize=lerp(this.actualSize,this.targetSize,deltaTime*this.velocitaLerp);
    
    

    push();
    if(this.actualSize>0.001)
    image(this.spriteNuvola,xNormalizzata(this.x),yNormalizzata(this.y),dimensioneNormalizzata(this.actualSize),dimensioneNormalizzata(this.actualSize));
    pop();
  }

  this.entra=function()
  {
    this.isEntering=true;
    this.actualSize=0.0001;
    this.targetSize=this.size;

    this.x=this.x1;
    this.y=this.y1;

    this.targetX=this.x2;
    this.targetY=this.y2;
  }

  this.esci=function()
  {
    this.targetSize=0.0001;

    this.isExiting=true;
    this.targetX=this.x3;
    this.targetY=this.y3;
  }
}


function Animazione(arrayFotogrammi,x,y,sizeX,sizeY,durata,loop=true,zIndex=0)
{
  animazioniInCorso.push(this);
  this.loop=loop;
  this.arrayFotogrammi=arrayFotogrammi;
  this.x=x;
  this.y=y;
  this.sizeX=sizeX;
  this.sizeY=sizeY;
  this.durata=durata;
  this.velocita=durata/arrayFotogrammi.length;
  this.zIndex=zIndex;
  this.pausa=false;
  this.play=true;
  

  this.ratio=arrayFotogrammi[0].height/arrayFotogrammi[0].width;

  this.indiceSprite=0;
  this.timerIndice=0;

  this.animazioneFinita=false;

  
  this.update=function()
  {

    if(!this.play)
    return;

    if(this.timerIndice<this.velocita)
    {
      this.timerIndice+=deltaTime;
      if(this.pausa)
      this.timerIndice=0;
    }
    else
    {
      this.timerIndice=0;
      if(this.indiceSprite<this.arrayFotogrammi.length-1)
      this.indiceSprite++;
      else
      {
        if(this.loop)
        this.indiceSprite=0;
        else
        this.animazioneFinita=true;
      }
    }

    push();
    if(!this.animazioneFinita)
    image(this.arrayFotogrammi[this.indiceSprite], xNormalizzata(this.x), yNormalizzata(this.y), dimensioneNormalizzata(this.sizeX), dimensioneNormalizzata(this.sizeY*this.ratio));
    pop();
  }

  this.setPausa=function(val)
  {
    this.pausa=val;
  }

  this.setPlay=function(val)
  {
    this.play=val;
  }


  
}



function dimensioneNormalizzata(x)
{
  return dimensioneMinore*x;
}

function xNormalizzata(x)
{
  x-=.5;
  return width/2+x*dimensioneMinore;
}

function yNormalizzata(y)
{
  y-=0.5;
  return height/2+y*dimensioneMinore;
}

function windowResized()
{
  resizeCanvas(windowWidth,windowHeight);
  setDimensioneMinore(); 
}



function setDimensioneMinore()
{
  if(windowHeight>windowWidth)
  {
  dimensioneMinore=windowWidth;
  dimensioneMinoreLato="width";
  }
  else
  {
    dimensioneMinore=windowHeight;
    dimensioneMinoreLato="height";
  }
}

function keyPressed()
{

  if(shakeMeter<shakeMeterSogliaMassima)
  shakeMeter+=shakeIncremento;
  else if(!shakeFranato)
  {
    frana();
  }

}

function frana()
{
  myLog("Frana");
  for(var i=0;i<creature.length;i++)
  {
    if(creature[i].tipoCreatura=="albero" && creature[i].habitat=="montagna")
    creature[i].muori();
  }

  shakeFranato=true;
}

function mouseWheel(event)
{

  temperaturaMeter-=event.delta*modificatoreCambioTemperatura;
 temperaturaMeter=constrain(temperaturaMeter,-50,50);

 if(temperaturaMeter<-40)
 livelloGhiaccio=4;
 else
  if(temperaturaMeter<-30)
  livelloGhiaccio=3;
  else
  if(temperaturaMeter<-15)
  livelloGhiaccio=2;
  else
  if(temperaturaMeter<0)
  livelloGhiaccio=1;
  else
  livelloGhiaccio=0;

  if(temperaturaMeter<0 && isRaining)
  {
    isRaining=false;
    isSnowing=true;
  }
  if(temperaturaMeter>0 && isSnowing)
  {
    isRaining=true;
    isSnowing=false;
  }

  pioggiaObj.setPlay(isRaining);
      neveObj.setPlay(isSnowing);


}

function prendiLuminositaWebcam()
{
  immagineWebcam=catturaWebcam.loadPixels();
  
  var numeroSample=20;
  var luminositaPixel=0;
  var sommaLuminosita=0;
  var incrementoPixelX=immagineWebcam.width/10;
  var incrementoPixelY=immagineWebcam.height/10;

 /* for(var x=0;x<immagineWebcam.width;x+=incrementoPixelX)
  {
    for(var y=0;y<immagineWebcam.height;y+=incrementoPixelY)
    {
      
      var pixelPreso=immagineWebcam.get(1,5);
     
      sommaLuminosita+=brightness(pixelPreso);
      numeroSample++;
      
    }
  }*/

  for(var i=0;i<numeroSample;i++)
  {

    var pixelPreso=immagineWebcam.get(noise(immagineWebcam.width),noise(immagineWebcam.height));
    sommaLuminosita+=brightness(pixelPreso);

    
  }

  var luminositaWebcamTemp=sommaLuminosita/numeroSample;

  //per evitare fluttuazioni
  if(abs(luminositaWebcamOldFrame-luminositaWebcamTemp)>=sogliaSensoreLuminosita)
  luminositaWebcam = luminositaWebcamTemp;
  
  luminositaWebcamOldFrame=luminositaWebcam;
}

function prendiVolumeMicrofono()
{
  volumeMicrofono=microfono.getLevel();

  if(!hasBlown)
  {
    if(volumeMicrofono>=sogliaSuonoUdibile)
    {
      hasBlown=true;
      numSoffi++;
      if(numSoffi>=3)
      numSoffi=0;

      if(numSoffi==2)
      {
        if(temperaturaMeter>0)
        isRaining=true;
        else
        isSnowing=true;
      }
      else
      {
        if(temperaturaMeter>0)
        isRaining=false;
        else
        isSnowing=false;
      }


      switch(numSoffi)
      {
        case 1:for(var i=0;i<nuvole.length;i+=2)
              {
                nuvole[i].entra();
              }
              break;
        
        case 2:for(var i=1;i<nuvole.length;i+=2)
              {
                nuvole[i].entra();
              }
              break;

        case 0:for(var i=0;i<nuvole.length;i++)
              {
                nuvole[i].esci();
              }
              break;
        

      }

      pioggiaObj.setPlay(isRaining);
      neveObj.setPlay(isSnowing);

      

      myLog("soffiato");
    }
  }
  else
  {
    timerSoffi+=deltaTime;
    if(volumeMicrofono<sogliaSuonoUdibile/2 && timerSoffi>tempoTraSoffi)
    {
      hasBlown=false;
      timerSoffi=0;
    }
  }

}

function gestisciSuoni()
{

  var volumeSuonoNotte=map(orologioMeter,0,50,1,0);
  volumeSuonoNotte=constrain(volumeSuonoNotte,0,1);
  suonoNotte.setVolume(volumeSuonoNotte);

  if(!isGiorno)
  {
    if(!suonoNotte.isPlaying())
    {
      
      suonoNotte.play();
    }
  }

}

function myLog(object)
{
  if(debug)
  {
    console.log(object);
  }
}