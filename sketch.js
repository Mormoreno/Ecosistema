
var mobile=false;
var desktop=true;

var debug=true;
var lowRes=false;

//BOUNDING
var spriteBoundingBox;

//TERRA
var spriteTerra;
var spriteMontagna;

//ACQUA
var spriteAcqua=Array();
var spriteGhiaccio=Array();
var spriteAnimazioneProva=Array();

//ANIMALI
var spriteVolpe=Array();
var volpi=Array();

//TEMPERATURA
var temperaturaMeter=0;

//VENTO
var microfono;
var sogliaSuonoUdibile=0.5;
var tempoTraSoffi=1;
var timerSoffi;
var volumeMicrofono=0;
var hasBlown=false;
var numSoffi=0;
var isRaining=false;
var spriteNuvol
//ACQUA
var acquaMeter=60;
var velocitaAcquaScende=1;
var velocitaAcquaSale=5;
 

//GIORNO/NOTTE
var catturaWebcam;
var immagineWebcam;
var luminositaWebcam=0;
var luminositaWebcamOldFrame;
var sogliaSensoreLuminosita=10;
var orologioMeter=0;
var velocitaCambioGiornoNotte=1.5;
var spriteSole;
var spriteLuna;



//ALBERI
var spriteAlberi=Array();
var alberi=Array();
var posizioniAlberi=Array();

//CREATURE
var creature=Array();



//TERREMOTO
var shakeMeter=0;
var shakeMeterVelocitaPerTornareAZero=3;
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

var dimensioneMinoreLato;
var dimensioneMinore;
var deltaTime=0;
var animazioniInCorso=Array();

var animazioneProva;
var velocitaAnimazioneProva=10;

var inizializzato=false;
var timerInizializzato=0;

function preload()
{
  
  listaPosizioni = loadJSON("assets/Posizioni.json");

 
  spriteSole=loadImage("assets/Sole.png");
  spriteLuna=loadImage("assets/Luna.png");

  spriteBoundingBox=loadImage("assets/BoundingBox.png");

  spriteTerra=loadImage("assets/Terra.png");
  spriteMontagna=loadImage("assets/Montagna.png");

  spriteNuvolettaFumetto=loadImage("assets/NuvolettaFumetto.png");

  for(var i=0;i<=3;i++)
  spriteAcqua.push(loadImage("assets/Acqua_"+i+".png"));
  

  for(var i=0;i<=3;i++)
  spriteGhiaccio.push(loadImage("assets/Ghiaccio_"+i+".png"));

  for(var i=0;i<=4;i++)
  spriteAnimazioneProva.push(loadImage("assets/AnimazioneProva_"+i+".png"));

  spritePittogrammi.push(loadImage("assets/Pittogramma_Sole.png"));

  spriteVolpe.push(loadImage("assets/Animali_Volpe.png"));


  for(var i=0;i<=1;i++)
  spriteAlberi.push(loadImage("assets/Albero_"+i+".png"));

  //SUONI
  suonoPop=loadSound("assets/suoni/Pop.wav");

  

  

}

function setup() {
    createCanvas(windowWidth,windowHeight);
    setDimensioneMinore();
    imageMode(CENTER);
    frameRate(60);

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
      //posizioniAlberi.push(new Posizione(datiPosizione.x,datiPosizione.y));
     // var albero=new Albero(posizioniAlberiSpiaggia[i].x,posizioniAlberiSpiaggia[i].y)
      creature.push(new Creatura(datiCreatura.tipoCreatura,datiCreatura.x,datiCreatura.y,datiCreatura.habitat));
    }
   
 


    //Performance optimization

    if(lowRes)
    {
      for(var i=0;i<=3;i++)
      spriteAcqua[i].resize(50,50);

      spriteNuvolettaFumetto.resize(50,50);

      spriteTerra.resize(100,100);
      spriteVolpe[0].resize(100,100);

      for(var i;i<spritePittogrammi.length;i++)
      spritePittogrammi[i].resize(50,50);
      for(var i;i<spriteAnimazioneProva.length;i++)
      spriteAnimazioneProva[i].resize(50,50);
    }

    
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

background(orologioMeter*2.55);



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

var posizioneSole=(100-orologioMeter)/100;

image(spriteSole,xNormalizzata(.2),yNormalizzata(posizioneSole),dimensioneNormalizzata(0.1),dimensioneNormalizzata(0.1));
image(spriteLuna,xNormalizzata(.8),yNormalizzata((orologioMeter)/100),dimensioneNormalizzata(0.1),dimensioneNormalizzata(0.1));

//Microfono
prendiVolumeMicrofono();


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
  acquaMeter-=deltaTime*velocitaAcquaScende;
}

//acquaMeter=(mouseX/width)*100;
acquaMeter=constrain(acquaMeter, 0,100);
if(acquaMeter<20)
  {
   
  }
  else
  if(acquaMeter>=20 && acquaMeter<40)
  {
    push();
    tint(255,map(acquaMeter,20,40,0,255));
    image(spriteAcqua[0],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
   // image(spriteGhiaccio[0],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    pop();
  }
  if(acquaMeter>=40 && acquaMeter<60)
  {
    image(spriteAcqua[0],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    push();
    tint(255,map(acquaMeter,40,60,0,255));
    image(spriteAcqua[1],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    pop();
  }
  if(acquaMeter>=60 && acquaMeter<80)
  {
    image(spriteAcqua[1],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    push();
    tint(255,map(acquaMeter,60,80,0,255));
    image(spriteAcqua[2],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    pop();
  }
  if(acquaMeter>=80 && acquaMeter<=100)
  {
    image(spriteAcqua[2],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    push();
    tint(255,map(acquaMeter,80,100,0,255));
    image(spriteAcqua[3],width*.5,height*.5, dimensioneMinore,dimensioneMinore);
    pop();
  }

 
  for(var i=0;i<alberi.length;i++)
    {
      if(alberi[i].habitat=="spiaggia")
      {
      if(acquaMeter>90)
      alberi[i].muori();
      else if(acquaMeter>70)
      alberi[i].fumetto("morte");
      else
      alberi[i].nasci();
      }
    }
  


  //CREATURE
  for(var i=0;i<creature.length;i++)
  {
    creature[i].update();
  }
 

  for(var i=0;i<animazioniInCorso.length;i++)
  animazioniInCorso[i].update();

  for(var i=0;i<arrayNuvoletteFumetto.length;i++)
  arrayNuvoletteFumetto[i].update();



image(spriteBoundingBox, width/2,height/2,dimensioneMinore,dimensioneMinore);

//FINE
pop();



if(debug)
  {
    fill(255);
    var mouseXnormalizzata=(mouseX-((width-dimensioneMinore)/2))/dimensioneMinore;
    var mouseYnormalizzata=(mouseY-((height-dimensioneMinore)/2))/dimensioneMinore;
    text("X="+mouseXnormalizzata.toFixed(2)+" Y="+mouseYnormalizzata.toFixed(2), mouseX, mouseY);

    text("AcquaMeter= "+acquaMeter.toFixed(2),10,10);
    text("ShakeMeter= "+shakeMeter.toFixed(2),10,30);
    text("Temperatura= "+temperaturaMeter.toFixed(2),10,50);
    text("LuminositaWebcam= "+luminositaWebcam.toFixed(2),10,70);
    text("Orologio= "+orologioMeter.toFixed(2),10,90);
    text("Microfono= "+volumeMicrofono.toFixed(2),10,110);
    text("Soffi= "+numSoffi,10,130);
    
  }

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
  this.lifeTime=2;
  this.timerLifeTime=0;

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
    image(spriteNuvolettaFumetto,xNormalizzata(this.x),yNormalizzata(this.y-.04),dimensioneMinore*.05*this.scala,dimensioneMinore*.05*this.scala);
    image(spritePittogrammi[0],xNormalizzata(this.x),yNormalizzata(this.y-.04),dimensioneMinore*.05*this.scala,dimensioneMinore*.05*this.scala);
    pop();
  }
}

function Creatura(tipoCreatura,x,y,habitat)
{
  this.x=x;
  this.y=y;
  this.tipoCreatura=tipoCreatura;
  this.habitat=habitat;
  this.spriteCreatura;

  switch(tipoCreatura)
  {
    case "albero":
                  this.size=0.03;
                  this.tipoAlbero=parseInt(random(0,spriteAlberi.length));
                  this.spriteCreatura=spriteAlberi[this.tipoAlbero];
                  
    break;

    case "volpe":
                this.size=0.05;
                this.spriteCreatura=spriteVolpe[0];

                
  }
  this.actualSize=this.size;
  this.ratio=this.spriteCreatura.height/this.spriteCreatura.width;
  this.morto=false;
  this.isGrowning=false;
  this.velocitaCrescita=.005;
  this.canTalk=true;

  
  this.update=function()
  {
    push();
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

      if(acquaMeter<20)
      {
        this.fumetto("sete");
      }
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

      image(this.spriteCreatura,xNormalizzata(this.x),yNormalizzata(this.y),dimensioneNormalizzata(this.actualSize),dimensioneNormalizzata(this.actualSize*this.ratio));
    }
      pop();
  }

  this.muori=function()
  {
    if(this.morto)
    return;

    suonoPop.play();
    new Animazione(spriteAnimazioneProva,this.x,this.y,.2,.2,.1,false);
    this.morto=true;
    this.actualSize=0;
  }
  this.nasci=function()
  {
    this.morto=false;
    this.isGrowning=true;
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
    this.canTalk=true;
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
  

  this.ratio=arrayFotogrammi[0].height/arrayFotogrammi[0].width;

  this.indiceSprite=0;
  this.timerIndice=0;

  this.animazioneFinita=false;

  
  this.update=function()
  {
    if(this.timerIndice<this.velocita)
    this.timerIndice+=deltaTime;
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
  prendiLuminositaWebcam();

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

  temperaturaMeter-=event.delta;
 temperaturaMeter=constrain(temperaturaMeter,-50,50);
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
      isRaining=true;
      else
      isRaining=false;

      myLog("soffiato");
    }
  }
  else
  {
    if(volumeMicrofono<sogliaSuonoUdibile/2)
    hasBlown=false;
  }

}

function myLog(object)
{
  if(debug)
  {
    console.log(object);
  }
}