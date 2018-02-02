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
var livelloAcqua=0;

//ANIMALI
var spriteVolpe=Array();
var spriteLontra=Array();
var spritePesce=Array();

var volpiCreate=0;
var volpiVive=0;

var lontreCreate=0;
var lontreVive=0;

var pesciCreati=0;
var pesciVivi=0;



//TEMPERATURA
var temperaturaMeter=25;
var indicatoriTemperatura=Array();
var spriteIndicatoreFreddo;
var spriteIndicatoreCaldo;
var modificatoreCambioTemperatura=0.06;
var oldYtocco=0;

//VENTO
var microfono;
var sogliaSuonoUdibile=0.2;
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

var lerpPioggia=0;


 

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
var posizioniStelle=Array();
var stelle=Array();


//ALBERI
var spriteAlberi=Array();
var alberi=Array();
var posizioniAlberi=Array();

//CREATURE
var creature=Array();



//TERREMOTO
var shakeMeter=0;
var shakeMeterVelocitaPerTornareAZero=4;
var shakeMeterSogliaMassima=7;
var shakeIncremento=1;
var shakePotenza=7 ;
var shakeAttivo=false;
var shakeFranato=false;
var spriteFrana=Array();
var franaObj;
var thresholdShake=100;

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
var suonoTerremoto;
var suonoVento;

var dimensioneMinoreLato;
var dimensioneMinore;
var deltaTime=0;
var animazioniInCorso=Array();
var spriteEsplosione=Array();
var spriteSfumatura;


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

  for(var i=0;i<=63;i++)
  spriteFrana.push(loadImage("assets/Frana/Frana_"+i+".png"));

  for(var i=0;i<=9;i++)
  spritePioggia.push(loadImage("assets/Pioggia/Pioggia_"+i+".png"));

  for(var i=0;i<=9;i++)
  spriteNeve.push(loadImage("assets/Neve/Neve_"+i+".png"));


  for(var i=0;i<=4;i++)
  spriteEsplosione.push(loadImage("assets/Esplosione/Animazione_Esplosione_"+i+".png"));

  for(var i=0;i<=6;i++)
  spritePittogrammi.push(loadImage("assets/Pittogrammi/Pittogramma_"+i+".png"));

  for(var i=0;i<=3;i++)
  spriteVolpe.push(loadImage("assets/Animali_Volpe_"+i+".png"));

  for(var i=0;i<=4;i++)
  spriteLontra.push(loadImage("assets/Animali_Lontra_"+i+".png"));

  for(var i=0;i<=3;i++)
  spritePesce.push(loadImage("assets/Animali_Pesce_"+i+".png"));

  for(var i=0;i<=3;i++)
  spriteAlberi.push(loadImage("assets/Albero_"+i+".png"));

  spriteNuvole.push(loadImage("assets/Nuvola.png"));


  //SUONI
  suonoPop=loadSound("assets/Suoni/Pop.wav");
  suonoPop.setVolume(0.03);
  suonoNotte=loadSound("assets/Suoni/SuonoNotte.mp3");
  suonoGiorno=loadSound("assets/Suoni/SuonoGiorno.mp3");
  suonoPioggia=loadSound("assets/Suoni/Pioggia.wav");
  suonoVento=loadSound("assets/Suoni/Vento.wav");
  suonoFrana=loadSound("assets/Suoni/Frana.wav");
  suonoTerremoto=loadSound("assets/Suoni/Terremoto.wav");

  spriteSfumatura=(loadImage("assets/Sfumatura.png"));

}

function setup() {

 if(isMobile.any())
 {
   myLog("Mobile");
   mobile=true;
   desktop=false;

   sogliaSuonoUdibile=0.13;
   modificatoreCambioTemperatura=.5;
   setShakeThreshold(thresholdShake);

 }

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
    nuvole.push(new Nuvola(datiJSON.x,datiJSON.y));
    }
   
    for(var i=0;i<100;i++)
    posizioniStelle.push(new Posizione(random(),random()));


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
    suonoGiorno.setLoop(true);
    suonoPioggia.setLoop(true);
    suonoTerremoto.setVolume(0.5);

    pioggiaObj=new Animazione(spritePioggia,0.49,0.44,.65,.65,.5,true,"pioggia");
    pioggiaObj.setPlay(false);

    neveObj=new Animazione(spriteNeve,0.49,0.44,.65,.65,1,true,"neve");
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
  translate(random(-1.0,1.0)*shakePotenza*shakeMeter, random(-1.0,1.0)*shakePotenza*shakeMeter);
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


var posizioneSole=constrain((100-orologioMeter)/100,0,100);
var posizioneLuna=constrain((orologioMeter)/100,0,100);

//STELLE
if(!isGiorno)
{
  push();
  fill(255,255*(posizioneSole-.5));
  noStroke();
  for(var i=0;i<posizioniStelle.length;i++)
  ellipse(xNormalizzata(posizioniStelle[i].x), yNormalizzata(posizioniStelle[i].y), dimensioneNormalizzata( random(0.7,1.0)*0.005));
  pop();
}

image(spriteSole,xNormalizzata(.2),yNormalizzata(.2 +posizioneSole*.7),dimensioneNormalizzata(0.1),dimensioneNormalizzata(0.1));
image(spriteLuna,xNormalizzata(.8),yNormalizzata(.2+posizioneLuna*.7),dimensioneNormalizzata(0.1),dimensioneNormalizzata(0.1));

//Microfono
prendiVolumeMicrofono();

//Temperatura
if(mobile)
{
  if(touches.length==1)
  {
    

    var deltaTocco=touches[0].y-oldYtocco;
    /*var temperaturaWanted=map(touches[0].y,0,height,50,-50);
    temp=lerp(temperaturaMeter,temperaturaWanted,6*deltaTime);
    console.log(temp);*/
    cambiaTemperatura(deltaTocco*modificatoreCambioTemperatura);
    oldYtocco=touches[0].y;
  }
}


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

if(isRaining || isSnowing)
{
lerpPioggia+=deltaTime;
}
if(!isRaining && !isSnowing)
{
lerpPioggia-=deltaTime;
}

lerpPioggia=constrain(lerpPioggia,0,1);

suonoPioggia.setVolume(lerpPioggia);

if(isRaining)
{
  acquaMeter+=deltaTime*velocitaAcquaSale;
  if(!suonoPioggia.isPlaying())
  suonoPioggia.play();
}
else
{
  if(lerpPioggia<=0 || isSnowing)
  suonoPioggia.pause();

  var modificatoreTemperatura=1;
  if(temperaturaMeter>25)
  modificatoreTemperatura=map(temperaturaMeter,25,50,0,10);

  if(!isSnowing)
  acquaMeter-=deltaTime*velocitaAcquaScende*modificatoreTemperatura;
  else
  {
    if(acquaMeter<soglieAcqua[1])
    acquaMeter+=deltaTime*velocitaAcquaSale;
  }
}

//acquaMeter=(mouseX/width)*100+10;
acquaMeter=constrain(acquaMeter, 0,100);
var scalaAcqua=dimensioneNormalizzata(0.46);
var scalaAcquaY=0.824*scalaAcqua;
var posizioneAcquaX=xNormalizzata(0.448);
var posizioneAcquaY=yNormalizzata(0.6);
if(acquaMeter<soglieAcqua[0])
  {
   livelloAcqua=0;
  }
  else
  if(acquaMeter>=soglieAcqua[0] && acquaMeter<soglieAcqua[1])
  {
    livelloAcqua=1;
    push();
    tint(255,map(acquaMeter,soglieAcqua[0],soglieAcqua[1],0,255));
    image(spriteAcqua[0].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY,scalaAcqua,scalaAcquaY);
    pop();
  }
  if(acquaMeter>=soglieAcqua[1] && acquaMeter<soglieAcqua[2])
  {
    livelloAcqua=2;
    image(spriteAcqua[0].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    push();
    tint(255,map(acquaMeter,soglieAcqua[1],soglieAcqua[2],0,255));
    image(spriteAcqua[1].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    pop();
  }
  if(acquaMeter>=soglieAcqua[2] && acquaMeter<soglieAcqua[3])
  {
    livelloAcqua=3;
    image(spriteAcqua[1].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    push();
    tint(255,map(acquaMeter,soglieAcqua[2],soglieAcqua[3],0,255));
    image(spriteAcqua[2].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    pop();
  }
  if(acquaMeter>=soglieAcqua[3] && acquaMeter<=soglieAcqua[4])
  {
    livelloAcqua=4;
    image(spriteAcqua[2].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    push();
    tint(255,map(acquaMeter,soglieAcqua[3],soglieAcqua[4],0,255));
    image(spriteAcqua[3].ghiacciato[livelloGhiaccio],posizioneAcquaX,posizioneAcquaY, scalaAcqua,scalaAcquaY);
    pop();
  }


 

  for(var i=0;i<animazioniInCorso.length;i++)
  if(animazioniInCorso[i].tipoAnimazione=="frana" )
  animazioniInCorso[i].update();

  //CREATURE
  volpiVive=0;
  lontreVive=0;
  pesciVivi=0;
  for(var i=0;i<creature.length;i++)
  {
    if(!creature[i].morto)
    {
      if(creature[i].tipoCreatura=="volpe" )
      volpiVive++;
      else
      if(creature[i].tipoCreatura=="lontra" )
      lontreVive++;
      else
      if(creature[i].tipoCreatura=="pesce" )
      pesciVivi++;
    }

    creature[i].update();
  }
 

  for(var i=0;i<animazioniInCorso.length;i++)
  if(animazioniInCorso[i].tipoAnimazione=="default" || animazioniInCorso[i].tipoAnimazione=="pioggia" || animazioniInCorso[i].tipoAnimazione=="neve")
  animazioniInCorso[i].update();

  for(var i=0;i<nuvole.length;i++)
  nuvole[i].update();

  for(var i=0;i<arrayNuvoletteFumetto.length;i++)
  arrayNuvoletteFumetto[i].update();

  for(var i=0;i<indicatoriTemperatura.length;i++)
  indicatoriTemperatura[i].update(); 


//image(spriteBoundingBox, width/2,height/2,dimensioneMinore,dimensioneMinore);
//image(spritePioggia[1],xNormalizzata(.49),yNormalizzata(.44),dimensioneNormalizzata(.65),dimensioneNormalizzata(.65));
//FINE
pop();



if(debug)
  {
    fill(255);
    

    var mouseXnormalizzata=(mouseX-((width-dimensioneMinore)/2))/dimensioneMinore;
    var mouseYnormalizzata=(mouseY-((height-dimensioneMinore)/2))/dimensioneMinore;

    //image(this.spriteNuvole[0],xNormalizzata(mouseXnormalizzata),yNormalizzata(mouseYnormalizzata),dimensioneNormalizzata(.1),dimensioneNormalizzata(.1));

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
    text("Lontre= "+lontreVive,10,interlinea);
    interlinea+=20;
    text("Pesci= "+pesciVivi,10,interlinea);
    interlinea+=20;
    text("Notte= "+daQuantiSecondiDuraLaNotte.toFixed(1),10,interlinea);
    interlinea+=20;
    text("Giorno= "+daQuantiSecondiDuraIlGiorno.toFixed(1),10,interlinea);
    interlinea+=20;
    text("LivelloAcqua= "+livelloAcqua,10,interlinea);
    interlinea+=20;
    text("SogliaSuonoUdibile= "+sogliaSuonoUdibile,10,interlinea);
    
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

  this.maxSize=dimensioneNormalizzata(0.05);
  this.maxSizePittogramma=this.maxSize*.38;

  this.altezza=0.045;
  if(this.owner.tipoCreatura!="albero")
  {
    this.altezza=0.02;
  }


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
    image(spriteNuvolettaFumetto,xNormalizzata(this.x),yNormalizzata(this.y-this.altezza),this.maxSize*this.scala,this.maxSize*this.scala);
    image(this.spritePittogramma,xNormalizzata(this.x),yNormalizzata(this.y-this.altezza-.002),this.maxSizePittogramma*this.scala,this.maxSizePittogramma*this.scala*(this.ratioSprite));
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

  this.tolleranzaGiorno=60;
  this.tolleranzaNotte=60;

  this.tolleranzaSete=45;
  this.timerSete=0;

  this.natoMorto=false;
  this.morto=false;


  switch(tipoCreatura)
  {
    case "albero":
                  this.size=0.08;
                  this.spriteCreatura=random(spriteAlberi);
                  this.tolleranzaNotte=60;
                  if(this.habitat=="spiaggiaSoleggiata")
                  {
                   this.natoMorto=true;
                  }
                  
    break;

    case "volpe":
                this.size=0.04;
                this.spriteCreatura=random(spriteVolpe);
                this.velocitaCrescita=0.005;
                this.tolleranzaNotte=90;
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
  if(this.natoMorto)
  {
    this.morto=true;
    this.actualSize=0;
  }

  this.ratio=this.spriteCreatura.height/this.spriteCreatura.width;
 
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
      if(this.habitat=="spiaggia" || this.habitat=="spiaggiaSoleggiata")
      {
        if(acquaMeter>90)
        this.dovrebbeMorire=true;
        else if(acquaMeter>80)
        this.fumetto("spavento");
        else
        {
          if(this.habitat=="spiaggia")
          this.dovrebbeNascere=true;
          else
          {
            if(daQuantiSecondiDuraIlGiorno>this.tolleranzaGiorno)
            this.dovrebbeNascere=true;
          }
        }

      }
      else
      if(this.habitat=="montagna")
      {
        if(!shakeFranato)
        this.dovrebbeNascere=true;
      }


      if(daQuantiSecondiDuraLaNotte>this.tolleranzaNotte-10)
      this.fumetto("notte");

      if(daQuantiSecondiDuraLaNotte>this.tolleranzaNotte)
      this.dovrebbeMorire=true;

      if(this.habitat=="montagna" && shakeFranato)
      this.dovrebbeMorire=true;

      if(acquaMeter<soglieAcqua[0])
      {
        this.fumetto("acqua");
        this.timerSete+=deltaTime;
        if(this.timerSete>this.tolleranzaSete)
        this.dovrebbeMorire=true;
      }
    }
    else
    //VOLPI====================================
    if(this.tipoCreatura=="volpe")
    {
      if(shakeFranato && this.indiceCreatura%2==0)
      {
        this.dovrebbeMorire=true;
      }
      else
      {
        if(random()<.5)
        if(frameCount%100==0)
        this.spriteCasuale(spriteVolpe);

        if(shakeMeter>2)
        this.fumetto("spavento");

        if(livelloAcqua==4)
        {
          if(this.habitat!="mareLivello3")
          {
            this.dovrebbeMorire=true;
          }
          else
          this.dovrebbeNascere=true;
        }
        else
        if(livelloAcqua==3)
        {
          this.dovrebbeNascere=true;
        }
        else
        if(livelloAcqua==2)
        {
          if(this.habitat=="mareLivello3")
          this.dovrebbeMorire=true;
          else
          this.dovrebbeNascere=true;
        }
        if(livelloAcqua==1)
        {
          if(this.habitat=="mareLivello2" || this.habitat=="mareLivello3")
          this.dovrebbeMorire=true;
          else
          this.dovrebbeNascere=true;
        }
        if(livelloAcqua==0)
        {
          if(this.habitat=="mareLivello1" || this.habitat=="mareLivello2" || this.habitat=="mareLivello3")
          this.dovrebbeMorire=true;
          else
          this.dovrebbeNascere=true;
        }

        if(daQuantiSecondiDuraLaNotte>this.tolleranzaNotte-10)
        this.fumetto("giorno");
        if(daQuantiSecondiDuraLaNotte>this.tolleranzaNotte)
        this.dovrebbeMorire=true;
        if(daQuantiSecondiDuraIlGiorno>this.tolleranzaGiorno)
        this.fumetto("notte");
      }
    }
    else
    //LONTRE
    if(this.tipoCreatura=="lontra")
    {

      if(random()<.5)
      if(frameCount%120==0)
      this.spriteCasuale(spriteLontra);

      for(var i=0;i<4;i++)
      {
        if(this.habitat=="mareLivello"+(i+1).toString())
        {
          if(acquaMeter<soglieAcqua[i])
          this.dovrebbeMorire=true;
          else
          this.dovrebbeNascere=true;
        }
        
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
    this.ratio=this.spriteCreatura.height/this.spriteCreatura.width;
  }
}


function Nuvola(x,y)
{
  this.x2=x;
  this.y2=y;


  this.x1=this.x2+.5;
  this.y1=this.y2+.5;
  this.x3=this.x2-.5;
  this.y3=this.y2-.5;

  this.x=this.x1;
  this.y=this.y1;

  this.targetX=this.x;
  this.targetY=this.y;

  this.isEntering=false;
  this.isExiting=false;



  this.size=0.1+random(-0.02,0.02);
  this.actualSize=0.001;
  this.targetSize=this.actualSize;

  this.velocitaLerp=3+random(-0.5,0.5);

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


function Animazione(arrayFotogrammi,x,y,sizeX,sizeY,durata,loop=true,tipoAnimazione="default")
{
  animazioniInCorso.push(this);
  this.tipoAnimazione=tipoAnimazione;
  this.loop=loop;
  this.arrayFotogrammi=arrayFotogrammi;
  this.x=x;
  this.y=y;
  this.sizeX=sizeX;
  this.sizeY=sizeY;
  this.durata=durata;
  this.velocita=durata/arrayFotogrammi.length;
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
    {
      if(this.tipoAnimazione=="pioggia" || this.tipoAnimazione=="neve")
      {
       
        if(lerpPioggia<=0 && this.play)
        this.setPlay(false);
        if(lerpPioggia<=0 || lerpPioggia!=1)
        tint(255,lerpPioggia*255);

      }
      image(this.arrayFotogrammi[this.indiceSprite], xNormalizzata(this.x), yNormalizzata(this.y), dimensioneNormalizzata(this.sizeX), dimensioneNormalizzata(this.sizeY*this.ratio));
    }
    else
    {
      if(this.tipoAnimazione=="frana")
      image(this.arrayFotogrammi[this.arrayFotogrammi.length-1], xNormalizzata(this.x), yNormalizzata(this.y), dimensioneNormalizzata(this.sizeX), dimensioneNormalizzata(this.sizeY*this.ratio));

    }
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
  dimensioneMinore=windowWidth*1.3;
  dimensioneMinoreLato="width";
  }
  else
  {
    dimensioneMinore=windowHeight*1.3;
    dimensioneMinoreLato="height";
  }
}

function deviceShaken()
{
  terremoto();
}

function keyPressed()
{
  //Solo spazio fa il terremoto
  if (keyCode == 32)
 terremoto();

 //Set solia microfono
 if(keyCode>=49 && keyCode<=57)
 sogliaSuonoUdibile=((keyCode-48)*.05).toFixed(2);

}

function terremoto()
{
  suonoTerremoto.rate(1+random(-.1,.1));
  suonoTerremoto.play();
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
  suonoFrana.setVolume(0.7);
  suonoFrana.play();
  franaObj=new Animazione(spriteFrana,0.5,0.5,1,1,2,false,"frana");
  shakeMeter=5;
  shakeFranato=true;
}

function cambiaTemperatura(temp)
{
  //if(!mobile)
  temperaturaMeter-=temp*modificatoreCambioTemperatura;
  /*else
  temperaturaMeter=temp;*/

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

function mouseWheel(event)
{

  if(!mobile)
  cambiaTemperatura(event.delta);


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

  var luminositaWebcamTemp=(sommaLuminosita/numeroSample);
  
  //Facciamo tendere più al giorno
  luminositaWebcamTemp*=1.1;
  luminositaWebcamTemp=constrain(luminositaWebcamTemp,0,100);

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
                if(isRaining)
                pioggiaObj.setPlay(true);
                if(isSnowing)
                neveObj.setPlay(true);
              }
              break;

        case 0:for(var i=0;i<nuvole.length;i++)
              {
                nuvole[i].esci();
              }
              break;
        

      }



      suonoVento.play();

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

  var volumeSuonoGiorno=map(orologioMeter,50,100,0,1);
  volumeSuonoGiorno=constrain(volumeSuonoGiorno,0,1);
  suonoGiorno.setVolume(volumeSuonoGiorno);

  if(!isGiorno)
  {
    if(!suonoNotte.isPlaying())
    {
      
      suonoNotte.play();
    }
  }
  else
  {
    if(!suonoGiorno.isPlaying())
    {
      
      suonoGiorno.play();
    }
  }

}

function touchStarted()
{
  if(touches.length==1)
  {
    oldYtocco=touches[0].y;
  }
}

function myLog(object)
{
  if(debug)
  {
    console.log(object);
  }
}

//https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};