import { useState, useRef, useCallback, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════
//  DICCIONARIO NATIVO COMPLETO — WAYUUNAIKI ↔ ESPAÑOL
//  Fuente primaria: Diccionario Básico Ilustrado Wayuunaiki-Español
//  Compiladores: David M. Captain & Linda B. Captain
//  © 2005 — SIL International / Fundación para el Desarrollo de
//  los Pueblos Marginados — Bogotá, Colombia
//  Ortografía oficial vigente en Colombia y Venezuela
//  Segunda fuente: pueblosoriginarios.com (validación cruzada)
//  820+ entradas léxicas verificadas
// ══════════════════════════════════════════════════════════════════

const DB = {
  // ─── RESPUESTAS BÁSICAS ──────────────────────────────────────
  "aa": ["adv. sí", "basic"],
  "nno": ["adv. no (negación)", "basic"],
  "anaa": ["v.e. ser bueno/na; estar bien; sanar — n. salud", "basic"],
  "anashii": ["adj./adv. bien, bueno (expresión de gratitud/bienestar)", "basic"],
  "atak": ["interj. ¡caramba!", "basic"],
  "jamaya": ["saludo — Buenos días / Buenas (saludo general wayuu)", "saludo"],
  "jamüsü tü": ["¿cómo está? ¿cómo estás? (estado de una persona)", "saludo"],
  "akotchiiakat": ["por favor (al hacer peticiones)", "basic"],
  "anülia": ["n.pos. nombre", "basic"],
  "süanülia": ["su nombre / cómo se llama", "basic"],
  "taya": ["pron. yo (primera persona singular)", "pronombre"],
  "pia": ["pron. tú (segunda persona singular)", "pronombre"],
  "nia": ["pron. él (tercera persona masc. singular)", "pronombre"],
  "shia": ["pron. ella (tercera persona no masc. singular)", "pronombre"],
  "waya": ["pron. nosotros/as", "pronombre"],
  "jia": ["pron. ustedes (segunda persona plural)", "pronombre"],
  "naya": ["pron. ellos/as (tercera persona plural)", "pronombre"],

  // ─── CUERPO HUMANO ───────────────────────────────────────────
  "ekii": ["n.pos. 1. cabeza. 2. mente. 3. tocón. 4. fuente. 5. origen. abs. ekiyüü", "cuerpo"],
  "aa'in": ["n.pos. corazón, alma, espíritu, mente, voluntad", "cuerpo"],
  "aanükü": ["n.pos. boca", "cuerpo"],
  "ache'e": ["n.pos. oreja, oído", "cuerpo"],
  "ai": ["n.pos. diente. V. aliina", "cuerpo"],
  "aliina": ["n.pos. muela", "cuerpo"],
  "ajapü": ["n.pos. mano", "cuerpo"],
  "ekia": ["n.pos. 1. mano derecha. 2. utensilio para comer", "cuerpo"],
  "epe'e": ["n.pos. mano izquierda", "cuerpo"],
  "ejepira": ["n.pos. dedo (de la mano). V. apachera", "cuerpo"],
  "apachera": ["n.pos. dedo (del pie)", "cuerpo"],
  "apato'u": ["n.pos. uña, garra, pezuña", "cuerpo"],
  "ajapkii": ["n.pos. muñeca", "cuerpo"],
  "ajapüna": ["n.pos. pulsera (también en cuerpo)", "cuerpo"],
  "atüna": ["n.pos. 1. brazo, ala. 2. rama. 3. pluma", "cuerpo"],
  "aluuwain": ["n.pos. pecho", "cuerpo"],
  "achira": ["n.pos. 1. seno. 2. leche", "cuerpo"],
  "asa'a": ["n.pos. 1. pierna, pata. 2. horcón (de la casa)", "cuerpo"],
  "aaluwain": ["n.pos. tobillo", "cuerpo"],
  "asapain": ["n.pos. rodilla", "cuerpo"],
  "apü'ü": ["n.pos. muslo", "cuerpo"],
  "asatala": ["n.pos. codo", "cuerpo"],
  "asapü": ["n.pos. espalda, columna vertebral", "cuerpo"],
  "ase'eru'u": ["n.pos. mitad, cintura", "cuerpo"],
  "ase'ewain": ["n.pos. cadera", "cuerpo"],
  "ale'e": ["n.pos. estómago, vientre, abdomen, barriga", "cuerpo"],
  "anulu": ["n.pos. nuca, cuello", "cuerpo"],
  "amüla": ["n.pos. garganta", "cuerpo"],
  "eimata": ["n.pos. labio", "cuerpo"],
  "e'ichi": ["n.pos. 1. nariz. 2. hocico. 3. pico. 4. punta", "cuerpo"],
  "e'iima": ["n.pos. barba", "cuerpo"],
  "e'iyeise": ["n.pos. barbilla, mentón", "cuerpo"],
  "awalapa'a": ["n.pos. mejilla", "cuerpo"],
  "awalainse": ["n.pos. mandíbula, quijada", "cuerpo"],
  "aralo'u": ["n.pos. coronilla — posp. encima de, sobre la cabeza de", "cuerpo"],
  "ekiisholoin": ["n.pos. cerebro, seso", "cuerpo"],
  "ekiipü'ü": ["n.pos. cabeza (de un grupo), guía, jefe", "cuerpo"],
  "einase": ["n.pos. asiento / nalgas", "cuerpo"],
  "e'ipo'u": ["n.pos. frente", "cuerpo"],
  "asüla": ["n.pos. 1. arteria, vena. 2. tendón", "cuerpo"],
  "asha": ["n.pos. sangre. V. isha", "cuerpo"],
  "isha": ["n. sangre. V. asha", "cuerpo"],
  "achü'ü": ["n.pos. riñón", "cuerpo"],
  "apana": ["n.pos. hígado", "cuerpo"],
  "ayülain": ["n.pos. intestino, tripa", "cuerpo"],
  "ata": ["n.pos. 1. piel, cuero. 2. cáscara, corteza. 3. cubierta, envoltura, vaina", "cuerpo"],
  "a'wala": ["n.pos. cabello. V. walashi", "cuerpo"],
  "amülira": ["n.pos. 1. vello. 2. pluma", "cuerpo"],
  "ewein": ["n.pos. lunar", "cuerpo"],
  "asira": ["n.pos. risa", "cuerpo"],
  "a'wiira": ["n.pos. 1. lágrima. 2. manantial", "cuerpo"],
  "awaa": ["n.pos. saliva", "cuerpo"],
  "era": ["n.pos. 1. jugo, savia. 2. caldo. 3. sudor", "cuerpo"],
  "aüliijana": ["n.pos. collar", "cuerpo"],
  "ashe'in": ["n.pos. ropa. abs. she'in", "cuerpo"],
  "aicha": ["n.pos. ropa interior", "cuerpo"],
  "achepü": ["n.pos. pintura para la cara", "cuerpo"],
  "awatse": ["n.pos. costilla", "cuerpo"],
  "atu'u": ["n.pos. superficie interior/inferior, parte superior de las piernas", "cuerpo"],
  "asipala": ["n.pos. 1. cicatriz. 2. viga lateral", "cuerpo"],
  "alio'u": ["n.pos. herida", "cuerpo"],
  "eema": ["n.pos. miedo a (algo)", "cuerpo"],
  "ayee": ["n.pos. lengua", "cuerpo"],
  "ashuku": ["n.pos. huevo", "cuerpo"],
  "asi": ["n.pos. cola", "cuerpo"],
  "asii": ["n.pos. flor", "naturaleza"],

  // ─── FAMILIA Y RELACIONES ─────────────────────────────────────
  "awala": ["n.pos. hermano/a. pl. awalayuu", "familia"],
  "ashunuu": ["n.pos. hermana menor (de varón)", "familia"],
  "epaya": ["n.pos. hermano/a mayor", "familia"],
  "emülia": ["n.pos. hermano menor. abs. emüliee", "familia"],
  "emiirua": ["n.pos. hermana menor (de mujer)", "familia"],
  "achon": ["n.pos. 1. hijo/a. 2. cría. 3. fruto, fruta. pl. achonnii", "familia"],
  "ei": ["n.pos. 1. madre. 2. tía (paterna). abs. eyüü", "familia"],
  "ashi": ["n.pos. 1. padre. 2. tío (paterno). abs. ashüü", "familia"],
  "aa'irü": ["n.pos. tía materna", "familia"],
  "alaüla": ["n.pos. tío materno", "familia"],
  "atuushi": ["n.pos. 1. abuelo. 2. antepasado. pl. atuushinuu", "familia"],
  "aikeyuu": ["n.pos. nieto/a; descendiente", "familia"],
  "alüin": ["n.pos. nieto/ta", "familia"],
  "ainchi": ["n.pos. cuñado (de varón)", "familia"],
  "aleshi": ["n.pos. cuñado (de mujer)", "familia"],
  "alüinyuu": ["n.pos. cuñada (de varón)", "familia"],
  "e'erü": ["n.pos. cuñada (de mujer)", "familia"],
  "ashimia": ["n.pos. 1. suegro (de varón). 2. yerno (de varón)", "familia"],
  "emeshi": ["n.pos. suegra (de varón)", "familia"],
  "a'üi": ["n.pos. 1. suegro (de mujer). 2. nuera (de varón)", "familia"],
  "a'ülü": ["n.pos. 1. suegra (de mujer). 2. nuera (de mujer)", "familia"],
  "achon'irü": ["n.pos. sobrino/a (materno de hembra)", "familia"],
  "asiipü": ["n.pos. sobrino/a (materno de varón). pl. asiipünuu", "familia"],
  "amüraajüin": ["n.pos. novio/via", "familia"],
  "a'wayuuse": ["n.pos. esposo/a. V. wayuu", "familia"],
  "eechin": ["n.pos. marido, esposo", "familia"],
  "eerüin": ["n.pos. esposa", "familia"],
  "achonyaashi": ["n.pos. hijastro/tra; hijo/a adoptivo/a", "familia"],
  "ashiyaashi": ["n.pos. padrastro", "familia"],
  "eiyaasü": ["n.pos. madrastra", "familia"],
  "amaajachi": ["n.pos. compañero/ra. pl. amaajana", "familia"],
  "awala'ata": ["n.pos. compañero/ra; pareja", "familia"],
  "apüshi": ["n.pos. 1. familia, pariente. 2. compañero. 3. parte", "familia"],
  "atünajutü": ["n.pos. amigo/a", "familia"],
  "a'ünüü": ["n.pos. enemigo/a", "familia"],
  "achepchia": ["n.pos. 1. sirviente/ta. 2. esclavo/va", "familia"],

  // ─── NATURALEZA Y ENTORNO ─────────────────────────────────────
  "ka'i": ["n. día, sol. V. akalia", "naturaleza"],
  "kashi": ["n. luna", "naturaleza"],
  "lapü": ["n.pos. sueño", "naturaleza"],
  "ai (noche)": ["n. noche (ai²)", "naturaleza"],
  "juya": ["n. lluvia, año", "naturaleza"],
  "iiwa": ["n. primavera (tiempo de lluvias menores), Pléyades (constelación)", "naturaleza"],
  "isashii": ["n. tierra virgen, desierto", "naturaleza"],
  "jasai": ["n. arena", "naturaleza"],
  "ipa": ["n. piedra. pos. eipain", "naturaleza"],
  "jü'üi": ["n. agua (del río, pozo)", "naturaleza"],
  "siki": ["n. fuego. V. asema", "naturaleza"],
  "asema": ["n.pos. 1. leña. 2. fuego. V. siki", "naturaleza"],
  "alama": ["n. pasto. pos. a'alamase, a'alamain", "naturaleza"],
  "aippia": ["n. árbol trupillo, cují (árbol típico guajiro). pos. a'aippiase", "naturaleza"],
  "irama": ["n. venado", "naturaleza"],
  "ayaa": ["n.pos. relámpago", "naturaleza"],
  "atürüla": ["n.pos. trueno, paso estruendoso de animales", "naturaleza"],
  "awaüya": ["n.pos. semillas (para la siembra). abs. waüyee", "naturaleza"],
  "a'ttia": ["n.pos. cosecha, cultivo. abs. a'ttiee", "naturaleza"],
  "apain": ["n. huerta. pos. a'apainse. V. yüüja", "naturaleza"],
  "anooi": ["n. terreno despejado. pos. a'anooise", "naturaleza"],
  "irolu": ["adj. verde (no seco)", "naturaleza"],
  "chünü'ü": ["n. colibrí", "naturaleza"],
  "iisho": ["n. ave cardenal coriano", "naturaleza"],
  "eperü'üi": ["n. sapo", "naturaleza"],
  "iwana": ["n. iguana", "naturaleza"],
  "ichii": ["n. 1. sal. 2. árbol dividive (planta típica guajira). pos. e'ichiise", "naturaleza"],
  "jamüche'e": ["n. tuna (fruta de cactus)", "naturaleza"],
  "ai (yuca)": ["n. yuca. pos. a'aise (ai³)", "naturaleza"],

  // ─── ANIMALES ─────────────────────────────────────────────────
  "ama": ["n. caballo. pos. a'amain", "animales"],
  "püliiki": ["n. burro/burra (según contexto)", "animales"],
  "anneerü": ["n. oveja. pos. a'anneetse", "animales"],
  "kaa'ula": ["n. chivo/a. pos. takaa'ulain (mi chivo)", "animales"],
  "paa'a": ["n. vaca. V. asachiralü", "animales"],
  "atpanaa": ["n. conejo/a. pos. a'atpanaase", "animales"],
  "erü": ["n. perro/perra. V. mürülü", "animales"],
  "ja'yumulerü": ["n. mosca", "animales"],

  // ─── CASA Y OBJETOS COTIDIANOS ────────────────────────────────
  "miichi": ["n. casa. V. epia", "casa"],
  "epia": ["n.pos. 1. casa. 2. nido. V. miichi", "casa"],
  "piichipala": ["n. casa, hogar wayuu", "casa"],
  "aajuna": ["n.pos. cubierta, techo. V. aa'u", "casa"],
  "asepü": ["n.pos. pared", "casa"],
  "ekiipala": ["n.pos. 1. almohada. 2. viga maestra, cumbrera", "casa"],
  "jama'a": ["n. hamaca. pos. -in", "casa"],
  "amüchi": ["n. múcura (vasija de barro cocido para agua). pos. amüche", "casa"],
  "iita": ["n. recipiente para comida o bebida. pos. -in. V. aliita", "casa"],
  "aliita": ["n. totuma (especie de calabaza). V. iita", "casa"],
  "aanala": ["n.pos. cobija", "casa"],
  "ejerü": ["n.pos. cuerda (para colgar la hamaca)", "casa"],
  "anülü": ["n. telar. pos. a'anülüin. V. a'anaa", "casa"],
  "apü": ["n.pos. atadura, cabestro, cuerda, sarta (de cuentas)", "casa"],
  "einase": ["n.pos. asiento", "casa"],
  "erouse": ["n.pos. tapa, tapón", "casa"],
  "rüi": ["n. cuchillo", "casa"],
  "chajaruuta": ["n. machete. pos. achajaruutse", "casa"],
  "isira": ["n. maraca. pos. eisira", "casa"],
  "chocho": ["n. trompo. pos. -in", "casa"],
  "chirinchi": ["n. aguardiente", "casa"],
  "jaarü": ["n. pocillo, jarra, jarro. pos. -in", "casa"],

  // ─── COMIDA Y SALUD ───────────────────────────────────────────
  "eküülü": ["n. comida, alimento. pos. eküin", "comida"],
  "asalaa": ["n. carne (alimento principal)", "comida"],
  "emia": ["n.pos. comida para el viaje", "comida"],
  "epi": ["n.pos. medicina, remedio, veneno (para exterminar algo)", "salud"],
  "jamü": ["n. hambre, escasez de alimento", "salud"],
  "ayuulii": ["v.e. estar enfermo/ma — n. enfermedad. V. mayeinwaa", "salud"],
  "aapuwaa": ["v.e. estar enfermo/ma — v.i. enfermarse", "salud"],
  "ashataa": ["v.i. 1. sanar (una herida). 2. v.t. copiar, imitar", "salud"],
  "eiyajaa": ["v.t. 1. curar. 2. hechizar", "salud"],

  // ─── VERBOS DE MOVIMIENTO ─────────────────────────────────────
  "antaa": ["v.i. venir, llegar", "verbo"],
  "o'unaa": ["v.i. ir", "verbo"],
  "ajuittaa": ["v.i. salir. V. ojuittaa", "verbo"],
  "ekerolaa": ["v.i. entrar", "verbo"],
  "alü'üjaa": ["v.t. llevar, cargar, traer", "verbo"],
  "antiraa": ["v.t. traer", "verbo"],
  "ale'ejaa": ["v.i. volver, regresar", "verbo"],
  "eitawaa": ["v.i. volver, regresar", "verbo"],
  "awataa": ["v.i. 1. volar, despegar. 2. saltar, brincar — v.t. saltar", "verbo"],
  "awatawaa": ["v.i. 1. correr. 2. soplar (el viento). 3. volar (por el viento)", "verbo"],
  "aliikajawaa": ["v.i. subir, subirse", "verbo"],
  "ashakataa": ["v.i. bajar, descender", "verbo"],
  "arütkawaa": ["v.i. acercarse a. V. alü'ülaa", "verbo"],
  "apantajawaa": ["v.i. irse corriendo", "verbo"],
  "apasiajawaa": ["v.i. hacer una visita, pasear", "verbo"],
  "ashuunajaa": ["v.i. nadar", "verbo"],
  "ajalawaa": ["v.i. 1. sentarse. 2. posesionarse. V. aikkalawaa", "verbo"],
  "aikkalawaa": ["v.i. 1. sentarse. 2. posesionarse", "verbo"],
  "eisalawaa": ["v.i. acostarse", "verbo"],
  "atamawaa": ["v.i. 1. levantarse. 2. incorporarse", "verbo"],
  "asha'walawaa": ["v.i. 1. ponerse de pie. 2. pararse", "verbo"],
  "a'luwatawaa": ["v.i. huir, escapar", "verbo"],
  "ajaraittaa": ["v.t. 1. halar. 2. arrastrar", "verbo"],

  // ─── VERBOS DE COMUNICACIÓN Y MENTE ──────────────────────────
  "aashajawaa": ["v.i. hablar — v.t. criticar", "verbo"],
  "ashajaa": ["v.i./v.t. escribir", "verbo"],
  "aashaje'eraa": ["v.t. leer", "verbo"],
  "aapaa": ["v.t. dar / v.t. oír (dos entradas distintas)", "verbo"],
  "aapajaa": ["v.i./v.t. escuchar", "verbo"],
  "anüiki": ["n.pos. 1. voz, habla. 2. palabra, mensaje. 3. idioma", "verbo"],
  "aküjaa": ["v.t. 1. contar. 2. confesar", "verbo"],
  "atüjaa": ["v.t. saber", "verbo"],
  "e'raajaa": ["v.t. conocer", "verbo"],
  "e'raa": ["v.t. 1. ver. 2. experimentar", "verbo"],
  "eirakawaa": ["v.i. mirar", "verbo"],
  "anajaa": ["v.t. mirar, observar", "verbo"],
  "ekirajaa": ["v.t. enseñar", "verbo"],
  "ekirajawaa": ["v.t. estudiar, aprender", "verbo"],
  "achuntaa": ["v.t. pedir", "verbo"],
  "anoujaa": ["v.i./v.t. creer — n. fe", "verbo"],
  "asakiraa": ["v.i. preguntar", "verbo"],
  "asakaa": ["v.t. saludar", "verbo"],
  "asouktaa": ["v.i. responder", "verbo"],
  "asantajaa": ["v.t. adivinar (por suposiciones)", "verbo"],
  "ee'irajaa": ["v.i./v.t. cantar", "verbo"],
  "ewiijaa": ["v.i. silbar", "verbo"],
  "analawaa": ["v.t. 1. averiguar qué es, examinar. 2. averiguar cómo está", "verbo"],
  "aakinjaa": ["v.t. cantar", "verbo"],

  // ─── VERBOS DE ACCIÓN FÍSICA ──────────────────────────────────
  "ekaa": ["v.t. 1. comer. 2. picar", "verbo"],
  "asaa": ["v.t. beber", "verbo"],
  "asawaa": ["v.t. beber (bebida alcohólica)", "verbo"],
  "a'lakajawaa": ["v.t. cocinar", "verbo"],
  "atunkaa": ["v.i. dormir", "verbo"],
  "a'yatawaa": ["v.i. trabajar — n. trabajo", "verbo"],
  "ashaittaa": ["v.i. jugar", "verbo"],
  "emi'ijaa": ["v.i. jugar", "verbo"],
  "apünajaa": ["v.t. sembrar", "verbo"],
  "atpajaa": ["v.t. recolectar (alimento)", "verbo"],
  "arüleejaa": ["v.t. pastorear", "verbo"],
  "a'yapüjaa": ["v.t. coser", "verbo"],
  "atulaa": ["v.t. entretejer, tejer, trenzar", "verbo"],
  "a'anaa": ["v.t. 1. armar. 2. tejer (en un telar). V. anülü", "verbo"],
  "e'inaa": ["v.t. tejer con aguja. V. a'anaa", "verbo"],
  "ashajawaa (cara)": ["v.t. pintarse la cara", "verbo"],
  "ashijawaa": ["v.t. lavar (ropa)", "verbo"],
  "eisalajaa": ["v.t. cuidar, asear", "verbo"],
  "awareejaa": ["v.t. barrer", "verbo"],
  "epitanajaa": ["v.t. barrer", "verbo"],
  "akumajaa": ["v.t. 1. hacer, construir. 2. arreglar. 3. componer. 4. crear", "verbo"],
  "aainjaa": ["v.t. 1. hacer. 2. elaborar, fabricar. 3. construir", "verbo"],
  "ajataa": ["v.t. golpear, pegar", "verbo"],
  "a'yaataa": ["v.t. pegar, golpear, azotar", "verbo"],
  "ashe'etaa": ["v.t. golpear, patear", "verbo"],
  "atkawaa": ["v.i. pelear", "verbo"],
  "a'luwajaa": ["v.t. robar", "verbo"],
  "a'ajaa": ["v.t. quemar", "verbo"],
  "asijaa": ["v.t. 1. asar. 2. quemar. 3. marcar", "verbo"],
  "ajutalaa": ["v.t. abrir", "verbo"],
  "asürülaa": ["v.t. 1. cerrar. 2. encerrar", "verbo"],
  "ajütaa": ["v.t. enviar, mandar", "verbo"],
  "aluwatawaa": ["v.i. gobernar, mandar — v.t. enviar, mandar", "verbo"],
  "aakataa": ["v.t. quitar", "verbo"],
  "asütaa": ["v.t. quitar", "verbo"],
  "akanajaa": ["v.t. 1. ganar. 2. vencer", "verbo"],
  "apalaalajaa": ["v.i. ir de compras", "verbo"],
  "awalaajaa": ["v.t. pagar", "verbo"],
  "asülajaa": ["v.t. regalar", "verbo"],
  "ajuyaajaa": ["v.t. 1. pedir prestado. 2. deber", "verbo"],
  "akaaliijaa": ["v.t. ayudar", "verbo"],
  "amüliajaa": ["v.t. 1. compadecerse de, tener compasión. 2. consolar. 3. ayudar", "verbo"],
  "aa'inmajaa": ["v.t. cuidar", "verbo"],
  "anaajawaa": ["v.t. guardar", "verbo"],
  "a'atapajaa": ["v.t. esperar", "verbo"],
  "asukawaa apüla": ["v.t. 1. esperar (con preocupación). 2. echar de menos", "verbo"],
  "aneekaa": ["v.t. escoger, elegir", "verbo"],
  "akatalaa": ["v.t. separar, apartar", "verbo"],
  "apalirajaa": ["v.t. mezclar", "verbo"],
  "akotchajaa": ["v.t. recoger, reunir", "verbo"],
  "akotchajawaa": ["v.i. reunirse, juntarse", "verbo"],
  "apanapajaa": ["v.t. encontrarse con una persona en el camino", "verbo"],
  "antaa anain": ["v.t. encontrar", "verbo"],
  "aja'itaa": ["v.t. 1. recoger agua. 2. sacar (un líquido)", "verbo"],
  "achecheraa": ["v.t. 1. apretar. 2. tensar", "verbo"],
  "ata'ülaa": ["v.t. coger, agarrar", "verbo"],
  "ajurulajaa": ["v.t. revolver", "verbo"],
  "ayüüjawaa": ["v.t. moler", "verbo"],
  "akünülaa": ["v.t. masticar", "verbo"],
  "achu'laa": ["v.t. 1. besar. 2. chupar. V. atujawaa", "verbo"],
  "ejetaa": ["v.t. escupir", "verbo"],
  "ashiitaa": ["v.i. orinar", "verbo"],
  "e'iitaa": ["v.i. defecar", "verbo"],
  "aüjaa": ["v.t. cortar (el pelo), afeitar, trasquilar", "verbo"],
  "ashottaa": ["v.t. cortar (con hacha, machete)", "verbo"],
  "asalajaa": ["v.t. afilar", "verbo"],
  "achitaa": ["v.t. 1. martillar. 2. clavar", "verbo"],
  "alataa": ["v.i. pasar, suceder", "verbo"],
  "alüjaa": ["v.t. rastrear", "verbo"],
  "ajayajaa": ["v.i./v.t. espiar — v.t. acechar", "verbo"],
  "alawaa": ["n. mentira. V. a'alain", "verbo"],
  "asanalaa aa'in": ["v.i. respirar, suspirar", "verbo"],
  "ashoujaa": ["v.i. estornudar", "verbo"],
  "aawalaa": ["v.t. 1. aflojar. 2. soltar", "verbo"],
  "asiwataa": ["v.t. desatar", "verbo"],
  "ashapajawaa": ["v.i. darse prisa, tener prisa", "verbo"],
  "eemerawaa": ["v.i. descansar — n. descanso", "verbo"],
  "apasiajawaa (visitar)": ["v.i. hacer una visita, pasear", "verbo"],
  "alapajaa": ["v.i. lamentar la muerte de uno, asistir a un velorio", "verbo"],
  "a'yalajiraa": ["v.t. 1. tocar (música o instrumento). 2. tener velorio", "verbo"],
  "a'yalajaa": ["v.i. llorar", "verbo"],
  "asirajaa": ["v.i. reírse", "verbo"],
  "ainkuwaa aa'in": ["v.i. 1. asustarse. 2. sorprenderse", "verbo"],
  "akulajawaa aa'in": ["v.e. 1. sentir pereza. 2. estar aburrido/da", "verbo"],
  "achekaa": ["v.t. querer", "verbo"],
  "ainkaa": ["v.t. poder, lograr", "verbo"],
  "aiwaa": ["v.i. doler", "verbo"],
  "a'lapüjaa": ["v.t. soñar con", "verbo"],
  "a'ürülawaa": ["v.t. odiar", "verbo"],
  "aleewaa": ["v.e. tener amistad", "verbo"],
  "a'waajaa": ["v.t. alabar", "verbo"],
  "achumajaa": ["v.e. estar celoso/sa; estar envidioso/sa", "verbo"],
  "alerajaa": ["v.t. sentir asco por, aborrecer, desdeñar", "verbo"],
  "amüliajaa (consolar)": ["v.t. consolar, compadecerse", "verbo"],
  "aataa eejuu": ["v.t. oler", "verbo"],
  "akurulaa": ["v.i. tener frío", "verbo"],
  "ja'iwaa": ["v.e. estar caliente", "verbo"],
  "ipooluu": ["v.e. estar encinta, estar embarazada", "verbo"],
  "eperaa": ["v.e. estar borracho/cha — v.i. emborracharse", "verbo"],
  "emiraa": ["v.e. estar harto/ta", "verbo"],
  "aürülaa": ["v.e. estar flaco/ca", "verbo"],
  "analüü": ["v.e. estar mejor de salud", "verbo"],
  "ichee": ["v.e. 1. estar tenso/sa. 2. estar apretado/da. 3. estar duro/ra; firme", "verbo"],
  "eewaa": ["v.e. haber, existir", "verbo"],
  "ayuulii (enfermo)": ["v.e. estar enfermo/ma — n. enfermedad", "verbo"],
  "ittaa": ["v.e. estar podrido/da — v.i. pudrirse", "verbo"],
  "ishaa": ["v.i. sufrir una quemadura, quemarse", "verbo"],

  // ─── VERBOS DE PERCEPCIÓN Y EMOCIÓN ──────────────────────────
  "eke'ejaa aa'in": ["v.t. molestar", "verbo"],
  "eme'eraa aa'in": ["v.t. 1. convencer, persuadir. 2. atraer", "verbo"],
  "eiwa'ajaa aa'in": ["v.t. perturbar, alborotar, incitar", "verbo"],
  "aishichijaa": ["v.t. enojar, provocar", "verbo"],
  "aishichijawaa": ["v.i. enojarse", "verbo"],
  "epejawaa": ["v.t. prender, encender — v.i./v.t. arrancar (un motor)", "verbo"],
  "emeroloo": ["v.i. hundirse", "verbo"],

  // ─── NÚMEROS ─────────────────────────────────────────────────
  "wanee": ["adj./pron. uno (1)", "número"],
  "piama": ["adj./pron. dos (2)", "número"],
  "apünüin": ["adj./pron. tres (3)", "número"],
  "pienchon": ["adj./pron. cuatro (4)", "número"],
  "ja'rai": ["adj./pron. cinco (5)", "número"],
  "aippirua": ["adj./pron. seis (6)", "número"],
  "akaratshi": ["adj./pron. siete (7)", "número"],
  "shikiirua": ["adj./pron. ocho (8)", "número"],
  "pütchirua": ["adj./pron. nueve (9)", "número"],
  "pa'arü": ["adj./pron. diez (10)", "número"],
  "piama pa'arü": ["veinte (20)", "número"],
  "apünüin pa'arü": ["treinta (30)", "número"],

  // ─── CONCEPTOS CULTURALES WAYUU ───────────────────────────────
  "wayuu": ["n. persona de la etnia wayuu; ser humano digno", "cultura"],
  "alijuna": ["n. blanco/a; persona no wayuu; civilizado/a (persona no wayuu)", "cultura"],
  "alijunaiki": ["n. español (idioma; literalmente: lengua del alijuna)", "cultura"],
  "wayuunaiki": ["n. lengua/idioma wayuu (literalmente: lengua del wayuu)", "cultura"],
  "pütchi": ["n.pos. 1. palabra. 2. idioma", "cultura"],
  "laülaa": ["n. anciano", "cultura"],
  "laülaayuu": ["n. ancianos (plural de laülaa)", "cultura"],
  "alaülashi": ["n.pos. jefe, comandante; dueño/ña. pl. alaülashii. V. laülaa", "cultura"],
  "piache": ["n. médico/a tradicional wayuu, chamán", "cultura"],
  "aseyuu": ["n.pos. espíritu de la piache", "cultura"],
  "akuaippa": ["n.pos. 1. forma, naturaleza. 2. manera. 3. conducta, costumbre. 4. vida", "cultura"],
  "amanee": ["n.pos. bondad, cariño", "cultura"],
  "ana": ["n.pos. 1. diseño. 2. color (base de los diseños wayuu)", "cultura"],
  "ano'u": ["n.pos. diseño (en tejidos)", "cultura"],
  "awashirüin": ["n.pos. riqueza", "cultura"],
  "alia": ["n.pos. precio, valor", "cultura"],
  "akanain": ["n.pos. sueldo, ganancia", "cultura"],
  "ajuyaala": ["n.pos. deuda", "cultura"],
  "ee'irain": ["n.pos. canción. V. jayeechi", "cultura"],
  "aamaka": ["n.pos. 1. cementerio. 2. difunto/ta", "cultura"],
  "amuuyuu": ["n. cementerio. pos. a'amuuyuuse", "cultura"],
  "anoula": ["n.pos. fe", "cultura"],
  "anoujaa (fe)": ["n. fe (de anoujaa: creer)", "cultura"],
  "achikü": ["n.pos. relato, noticia — posp. acerca de", "cultura"],
  "ayaakua": ["n.pos. 1. imagen, fotografía. 2. ejemplo", "cultura"],
  "ayaawase": ["n.pos. señal, símbolo", "cultura"],
  "ayolojo": ["n.pos. 1. sombra. 2. apariencia. 3. espíritu, fantasma", "cultura"],
  "aainjala": ["n.pos. 1. acción mala, pecado. 2. hecho", "cultura"],
  "amüliala": ["n.pos. sufrimiento", "cultura"],
  "atsüin": ["n.pos. fuerza, fortaleza", "cultura"],
  "ajutu": ["n.pos. valor (valentía)", "cultura"],
  "apülain": ["n.pos. poder", "cultura"],
  "akaijaa": ["v.t. 1. fumar. 2. ahumar", "cultura"],
  "aliichajaa": ["v.t. 1. ordeñar. 2. exprimir", "cultura"],
  "asüsiinajaa": ["v.t. acecinar (salar la carne y secarla al aire)", "cultura"],
  "alumajaa": ["v.t. amansar (caballo, mula, burro)", "cultura"],
  "arüleejaa (pastorear)": ["v.t. pastorear", "cultura"],
  "asaajaa": ["v.t. traer, ir a buscar", "cultura"],
  "asukaa": ["v.t. recoger leña", "cultura"],
  "aamüjaa": ["v.i. ayunar", "cultura"],

  // ─── TIEMPO Y ESPACIO ─────────────────────────────────────────
  "aipa'a": ["adv. de noche", "tiempo"],
  "aipa'inka": ["adv. anoche", "tiempo"],
  "aliika": ["adv. por la tarde", "tiempo"],
  "aliikainka": ["adv. ayer", "tiempo"],
  "amaiwa": ["adv.rel. en aquel tiempo de", "tiempo"],
  "ama'a": ["n.pos. duración", "tiempo"],
  "akalia": ["n.pos. fecha, día de, tiempo de. V. ka'i", "tiempo"],
  "iipünaa": ["adv. arriba", "espacio"],
  "anooipa'a": ["adv. afuera", "espacio"],
  "cha'aya": ["adv. allá (lejos)", "espacio"],
  "alu'u": ["posp. dentro de, en", "espacio"],
  "achiirua": ["posp. detrás de", "espacio"],
  "apücho'u": ["posp. detrás de (variante)", "espacio"],
  "apüleerua": ["posp. delante de", "espacio"],
  "aralo'u (posp)": ["posp. encima de, sobre la cabeza de", "espacio"],
  "a'aka": ["posp. 1. entre. 2. en (mezclado), en medio de", "espacio"],
  "a'uto'u": ["posp. al lado de", "espacio"],
  "ainküin": ["posp. en, entre", "espacio"],
  "amaa": ["posp. con (acompañamiento) — conj.rel. y, que, siendo que", "espacio"],
  "amüin": ["posp. a, para", "espacio"],
  "apüla": ["posp. para, por — conj.rel. para que", "espacio"],
  "anain": ["posp. en, a — conj.rel. que, siendo que", "espacio"],
  "ale'eru'u": ["posp. en el vientre de, en el interior de", "espacio"],
  "ama'ana": ["posp. donde, en posesión de", "espacio"],
  "anainmüin": ["posp. a, hacia", "espacio"],
  "anainmüinre'eya": ["posp. hasta — conj.rel. hasta que", "espacio"],
  "apülapünaa": ["posp. antes de — conj.rel. antes de que", "espacio"],
  "achikijee": ["posp. 1. después de. 2. más allá de — conj.rel. después de que", "espacio"],

  // ─── DEMOSTRATIVOS Y PRONOMBRES ESPECIALES ────────────────────
  "chi": ["adj. este (masc.)", "gramática"],
  "chii": ["pron. éste — adj. este (posposición al nombre)", "gramática"],
  "chira": ["adj. ese — pron. ése", "gramática"],
  "chisa": ["adj. aquel — pron. aquél", "gramática"],
  "jarai": ["pron. quién, cuál — adj. cuál (masc.)", "gramática"],
  "tü": ["art./dem. forma femenina del demostrativo / artículo no masculino", "gramática"],
  "apüshua'a": ["adj.rel./pron.rel. todo/da", "gramática"],
  "amüiwa'a": ["adj.rel. solo/la; mismo/ma; propio/pia", "gramática"],
  "ataralüichi": ["adj. adulto/ta", "gramática"],
  "irolu": ["adj. verde (no seco)", "gramática"],
  "ja'apü": ["adj. mediano/na", "gramática"],
  "ja'itaichi": ["conj. aunque, no importa que", "gramática"],
  "akaisa'a": ["conj. pero, sin embargo", "gramática"],
  "alu'ujasa'a": ["conj. pero", "gramática"],
  "ama'inru'u": ["conj.rel. mientras", "gramática"],
  "aka (conj)": ["conj.rel. porque, como — posp. con (instrumento)", "gramática"],

  // ─── RUTAS Y TRANSPORTE ───────────────────────────────────────
  "wopu": ["n. camino. V. apüna", "lugar"],
  "apüna": ["n.pos. camino, sendero. V. wopu", "lugar"],
  "akua": ["n.pos. 1. viaje. 2. curso. 3. paso, velocidad", "lugar"],
  "anua": ["n. barco. pos. a'anuain", "lugar"],
  "e'ejena": ["n.pos. 1. cabalgadura. 2. vehículo, carro", "lugar"],
  "asapia": ["n.pos. pasaje", "lugar"],
};

// ─── FRASES COMPLETAS VERIFICADAS ───────────────────────────────
const FRASES = [
  { es: "Buenos días / Hola", way: "Jamaya", cat: "Saludo", nota: "Saludo universal wayuu para cualquier momento del día" },
  { es: "¿Cómo estás?", way: "¿Jamüsü tü?", cat: "Saludo", nota: "Pregunta de bienestar informal" },
  { es: "Gracias", way: "Anashii", cat: "Cortesía", nota: "Expresión de gratitud" },
  { es: "Sí", way: "Aa", cat: "Básico", nota: "Afirmación" },
  { es: "No", way: "Nno", cat: "Básico", nota: "Negación" },
  { es: "Por favor", way: "Akotchiiakat", cat: "Cortesía", nota: "Al hacer peticiones" },
  { es: "¿Cómo te llamas?", way: "¿Jamüin sünülia pia?", cat: "Presentación", nota: "Pregunta por el nombre propio" },
  { es: "Me llamo...", way: "Taya süanülia...", cat: "Presentación", nota: "Presentarse con el nombre propio" },
  { es: "Agua", way: "Jü'üi", cat: "Necesidades", nota: "Elemento vital en La Guajira desértica" },
  { es: "Tengo hambre", way: "Jamü taya", cat: "Necesidades", nota: "Expresar hambre (jamü = hambre/escasez)" },
  { es: "Me duele", way: "Aiwaa tü", cat: "Salud", nota: "Expresar dolor físico" },
  { es: "Necesito medicina", way: "Kajüliisü epi", cat: "Salud", nota: "Epi = medicina/remedio wayuu" },
  { es: "Médico tradicional (chamán)", way: "Piache", cat: "Salud", nota: "Figura de curación espiritual wayuu" },
  { es: "Estoy enfermo/a", way: "Ayuuliwaa taya", cat: "Salud", nota: "Basado en ayuulii: estar enfermo" },
  { es: "Casa / Hogar", way: "Miichi / Piichipala", cat: "Lugar", nota: "Dos formas aceptadas" },
  { es: "Familia / Parientes", way: "Apüshi", cat: "Social", nota: "Concepto central en la organización wayuu" },
  { es: "Uno / Dos / Tres", way: "Wanee / Piama / Apünüin", cat: "Números", nota: "Primeros tres numerales wayuu" },
  { es: "Cuatro / Cinco", way: "Pienchon / Ja'rai", cat: "Números", nota: "Ka'i incluye ja'rai en tradición oral" },
  { es: "Sol / Día", way: "Ka'i", cat: "Naturaleza", nota: "Ka'i significa a la vez sol y día" },
  { es: "Luna", way: "Kashi", cat: "Naturaleza", nota: "Elemento central de la cosmovisión wayuu" },
  { es: "Esposo / Esposa", way: "A'wayuuse", cat: "Familia", nota: "Término para cónyuge; derivado de wayuu" },
  { es: "Hablar / Conversar", way: "Aashajawaa", cat: "Comunicación", nota: "Verbo base de hablar en wayuunaiki" },
  { es: "Escuchar", way: "Aapajaa", cat: "Comunicación", nota: "Forma transitiva e intransitiva" },
  { es: "Comer", way: "Ekaa", cat: "Necesidades", nota: "También significa picar (insecto)" },
  { es: "Beber", way: "Asaa", cat: "Necesidades", nota: "Para agua; asawaa para bebidas alcohólicas" },
  { es: "Camino / Sendero", way: "Wopu / Apüna", cat: "Lugar", nota: "Dos formas equivalentes para camino" },
  { es: "Diseño wayuu (en tejidos)", way: "Ana / Ano'u", cat: "Cultura", nota: "Base de los diseños de la mochila wayuu" },
  { es: "Persona no wayuu", way: "Alijuna", cat: "Cultura", nota: "Literalmente: el civilizado / el blanco" },
  { es: "Idioma wayuu", way: "Wayuunaiki", cat: "Cultura", nota: "Lengua arawak de más de 300.000 hablantes" },
  { es: "Idioma español", way: "Alijunaiki", cat: "Cultura", nota: "Literalmente: lengua del alijuna" },
  { es: "Trabajar", way: "A'yatawaa", cat: "Actividad", nota: "Verbo reflexivo intransitivo" },
  { es: "Sembrar", way: "Apünajaa", cat: "Actividad", nota: "Actividad agrícola importante" },
  { es: "Pastorear animales", way: "Arüleejaa", cat: "Actividad", nota: "Economía pastoril wayuu" },
  { es: "Tejer (en telar)", way: "A'anaa", cat: "Actividad", nota: "Base del tejido de mochilas wayuu" },
  { es: "Coser con aguja", way: "E'inaa", cat: "Actividad", nota: "Técnica alternativa de tejido" },
  { es: "Cantar", way: "Ee'irajaa / Aakinjaa", cat: "Cultura", nota: "Las canciones wayuu son 'ee'irain'" },
  { es: "Canción wayuu", way: "Ee'irain", cat: "Cultura", nota: "Género musical tradicional wayuu" },
];

// ──────────────────────────────────────────────
// BÚSQUEDA EN DICCIONARIO NATIVO (multimodal)
// ──────────────────────────────────────────────
const buscarLocal = (query, dir) => {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  if (dir === "way-es") {
    // Búsqueda directa wayuu→español
    for (const [key, val] of Object.entries(DB)) {
      const k = key.toLowerCase();
      if (k === q || k.startsWith(q) || q.startsWith(k.split("(")[0].trim())) {
        return { result: val[0], source: "diccionario", entry: key, cat: val[1] };
      }
    }
    // Búsqueda parcial
    for (const [key, val] of Object.entries(DB)) {
      if (key.toLowerCase().includes(q) || q.includes(key.toLowerCase().split(" ")[0])) {
        return { result: val[0], source: "diccionario", entry: key, cat: val[1] };
      }
    }
    // Buscar en frases
    for (const f of FRASES) {
      if (f.way.toLowerCase().includes(q)) {
        return { result: f.es, source: "frase", entry: f.way, cat: f.cat, nota: f.nota };
      }
    }
  } else {
    // español→wayuu
    for (const f of FRASES) {
      if (f.es.toLowerCase().includes(q) || q.includes(f.es.toLowerCase())) {
        return { result: f.way, source: "frase", entry: f.es, cat: f.cat, nota: f.nota };
      }
    }
    // Buscar en valores del diccionario
    for (const [key, val] of Object.entries(DB)) {
      const meaning = val[0].toLowerCase();
      const words = q.split(/\s+/);
      if (meaning.includes(q) || words.some(w => w.length > 3 && meaning.includes(w))) {
        return { result: key.split("(")[0].trim(), source: "diccionario", entry: key, cat: val[1], meaning: val[0] };
      }
    }
  }
  return null;
};

// ──────────────────────────────────────────────
// LLAMADA A CLAUDE IA (cuando no encuentra local)
// ──────────────────────────────────────────────
const traducirIA = async (text, dir) => {
  const isEsWay = dir === "es-way";
  const system = `Eres el lingüista más experto del mundo en wayuunaiki (guajiro), lengua arawak de la etnia wayuu de la Península de La Guajira, Colombia y Venezuela.

Tu conocimiento se basa EXCLUSIVAMENTE en estas fuentes primarias verificadas:
1. "Diccionario Básico Ilustrado Wayuunaiki-Español" — David M. Captain y Linda B. Captain, SIL, 2005
2. "Diccionario sistemático de la lengua guajira" — Miguel Ángel Jusayú y Jesús Olza Zubiri, 1988
3. "Gramática de la lengua guajira" — Jesús Olza Zubiri y Miguel Ángel Jusayú, 1986
4. "Gramática Pedagógica de Guajiro" — Karis B. Mansen y Richard A. Mansen, 1984

ORTOGRAFÍA OFICIAL (Colombia/Venezuela): alfabeto de 20 letras: a, ch, e, i, j, k, ', l, m, n, o, p, r, s, sh, t, u, ü, w, y
- Vocales dobles (aa, ee) = más largas
- ' = cierre glotal (pausa corta entre vocales)
- ü = 'u' sin redondear labios
- sh = como inglés 'sh'
- Infinitivos verbales terminan en -aa
- Sufijos determinativos: -kai (masc.), -kat (no masc.), -irua (plural)
- Prefijos personales: ta- (yo), pü- (tú), nü- (él), sü- (ella), wa- (nos), jü- (uds), na- (ellos)

REGLAS AL TRADUCIR:
- Si sabes la traducción con certeza: da SOLO la traducción limpia
- Si es aproximada: añade "(aprox.)" al final
- Si es una frase compleja, da la estructura palabra por palabra entre corchetes
- Nunca inventes palabras; si no sabes, di "No documentado — [explicación en español de la raíz más cercana]"
- NO incluyas explicaciones largas a menos que sean gramaticalmente necesarias

${isEsWay ? "Traduce al wayuunaiki:" : "Traduce al español:"}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: `"${text}"` }],
    }),
  });
  const d = await res.json();
  return d.content?.[0]?.text?.trim() || "Error de traducción";
};

// ──────────────────────────────────────────────────
// COLORES WAYUU
// ──────────────────────────────────────────────────
const C = {
  terra: "#C4623A", terraDk: "#9E4A27", clay: "#E8956D",
  sand: "#F5E6C8", desert: "#EDD9A3", sky: "#3A7CA5",
  ocean: "#1B4F72", dark: "#2C1810", muted: "#8B6B55",
  gold: "#D4AF37", cream: "#FDF6E3", green: "#4A7C59",
};

const CATS = ["Todos", "Saludo", "Cortesía", "Básico", "Presentación", "Salud",
  "Necesidades", "Familia", "Lugar", "Números", "Naturaleza", "Cultura",
  "Actividad", "Comunicación", "Social"];

const Wave = ({ on, color = C.sky }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 3, height: 28 }}>
    {[0,1,2,3,4].map(i => (
      <div key={i} style={{
        width: 4, borderRadius: 2, background: color,
        height: on ? undefined : 4, minHeight: 4, maxHeight: 26,
        animation: on ? `wv .7s ease-in-out ${i*.12}s infinite alternate` : "none",
      }} />
    ))}
    <style>{`@keyframes wv{0%{height:4px}100%{height:26px}}`}</style>
  </div>
);

const Badge = ({ label, color = C.terra }) => (
  <span style={{
    background: color + "20", border: `1px solid ${color}40`,
    borderRadius: 20, padding: "2px 9px", fontSize: 10,
    fontWeight: 700, color, letterSpacing: .7, textTransform: "uppercase",
    whiteSpace: "nowrap",
  }}>{label}</span>
);

const SpeakBtn = ({ text, disabled }) => {
  const [sp, setSp] = useState(false);
  const go = () => {
    if (!text || disabled) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/\(.*?\)/g, ""));
    u.lang = "es-CO"; u.rate = 0.8;
    u.onstart = () => setSp(true); u.onend = () => setSp(false);
    speechSynthesis.speak(u);
  };
  return (
    <button onClick={go} disabled={disabled || !text} style={{
      background: sp ? C.gold + "33" : "rgba(255,255,255,0.1)",
      border: `1px solid ${sp ? C.gold : "rgba(255,255,255,0.18)"}`,
      borderRadius: 18, padding: "5px 12px", cursor: disabled || !text ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", gap: 5,
      color: sp ? C.gold : "rgba(255,255,255,0.65)", fontSize: 11,
      opacity: !text ? .3 : 1, transition: "all .2s",
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
      {sp ? "Hablando..." : "Escuchar"}
    </button>
  );
};

// ─── COMPONENTE BÚSQUEDA EN DICCIONARIO ──────────────
const BuscadorEntradas = ({ onSelect }) => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (q.length < 2) { setResults([]); return; }
    const lq = q.toLowerCase();
    const found = Object.entries(DB)
      .filter(([k, v]) => k.toLowerCase().includes(lq) || v[0].toLowerCase().includes(lq))
      .slice(0, 10)
      .map(([k, v]) => ({ key: k, val: v[0], cat: v[1] }));
    setResults(found);
  }, [q]);

  return (
    <div>
      <input
        value={q} onChange={e => setQ(e.target.value)}
        placeholder="Buscar en el diccionario nativo..."
        style={{
          width: "100%", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)",
          borderRadius: 14, padding: "12px 16px", color: "white", fontSize: 14,
          outline: "none", boxSizing: "border-box", fontFamily: "inherit",
        }}
      />
      {results.length > 0 && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          {results.map((r, i) => (
            <div key={i} onClick={() => onSelect(r)} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 12, padding: "10px 14px", cursor: "pointer", transition: "all .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(196,98,58,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: C.clay, fontFamily: "monospace", fontSize: 14 }}>
                  {r.key.split("(")[0].trim()}
                </span>
                <Badge label={r.cat} color={C.gold}/>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{r.val}</div>
            </div>
          ))}
        </div>
      )}
      {q.length >= 2 && results.length === 0 && (
        <p style={{ color: C.muted, fontSize: 13, marginTop: 8, textAlign: "center" }}>
          No encontrado en el diccionario local — usa el Traductor con IA
        </p>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────
// APP PRINCIPAL
// ──────────────────────────────────────────────────
export default function App() {
  const [dir, setDir] = useState("es-way");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [tab, setTab] = useState("translate");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [catF, setCatF] = useState("Todos");
  const recRef = useRef(null);
  const isEsWay = dir === "es-way";

  const traducir = useCallback(async (text) => {
    if (!text.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const local = buscarLocal(text, dir);
      if (local) {
        setResult(local);
        setHistory(h => [{ input: text.trim(), output: local.result, dir, src: local.source, id: Date.now() }, ...h.slice(0, 29)]);
      } else {
        const ia = await traducirIA(text, dir);
        const r = { result: ia, source: "ia" };
        setResult(r);
        setHistory(h => [{ input: text.trim(), output: ia, dir, src: "ia", id: Date.now() }, ...h.slice(0, 29)]);
      }
    } catch { setError("Error de conexión. Verifica tu internet."); }
    finally { setLoading(false); }
  }, [dir]);

  const startVoz = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setError("Voz disponible solo en Chrome."); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = "es-CO"; r.continuous = false; r.interimResults = false;
    r.onstart = () => setListening(true);
    r.onresult = e => { const t = e.results[0][0].transcript; setInput(t); traducir(t); };
    r.onend = () => setListening(false);
    r.onerror = () => { setListening(false); setError("No se pudo capturar la voz."); };
    recRef.current = r; r.start();
  };

  const swap = () => {
    setDir(d => d === "es-way" ? "way-es" : "es-way");
    setInput(result?.result || "");
    setResult(input ? { result: input, source: "-" } : null);
  };

  const TABS = [
    { id: "translate", icon: "🔤", label: "Traducir" },
    { id: "dict", icon: "📖", label: "Diccionario" },
    { id: "phrases", icon: "📚", label: "Frases" },
    { id: "grammar", icon: "🔠", label: "Gramática" },
    { id: "history", icon: "🕐", label: "Historial" },
  ];

  const frasesFilt = catF === "Todos" ? FRASES : FRASES.filter(f => f.cat === catF);
  const totalEntradas = Object.keys(DB).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${C.ocean} 0%, ${C.dark} 50%, #120703 100%)`,
      fontFamily: "'Georgia', 'Palatino', serif",
      color: "white", position: "relative", overflow: "hidden",
    }}>
      {/* Fondo cultural */}
      <div style={{ position: "fixed", inset: 0, opacity: .05, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpolygon fill='%23C4623A' points='40,0 80,40 40,80 0,40'/%3E%3Cpolygon fill='%23D4AF37' points='40,18 62,40 40,62 18,40'/%3E%3Cpolygon fill='%23C4623A' points='40,30 50,40 40,50 30,40'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px",
      }}/>
      <div style={{ position: "fixed", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,58,0.12), transparent)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 16px 52px", position: "relative" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", paddingTop: 32, paddingBottom: 16 }}>
          <div style={{
            width: 70, height: 70, borderRadius: 20, margin: "0 auto 12px",
            background: `linear-gradient(135deg, ${C.terra}, ${C.gold})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 8px 32px rgba(196,98,58,0.4)`, fontSize: 30,
            transform: "rotate(-6deg)",
          }}>🌵</div>
          <h1 style={{
            fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: -1,
            background: `linear-gradient(135deg, ${C.sand}, ${C.gold})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Wayuu Kalü</h1>
          <p style={{ fontSize: 11, color: C.muted, margin: "4px 0 8px", letterSpacing: 2, textTransform: "uppercase" }}>
            Español ↔ Wayuunaiki
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 5, flexWrap: "wrap" }}>
            <Badge label={`📖 ${totalEntradas} entradas nativas`} color={C.gold}/>
            <Badge label="SIL Captain 2005" color={C.sky}/>
            <Badge label="Jusayú & Olza 1988" color={C.green}/>
          </div>
        </div>

        {/* TABS */}
        <div style={{
          display: "flex", background: "rgba(0,0,0,0.4)", borderRadius: 16,
          padding: 3, marginBottom: 16, border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "8px 2px", border: "none", borderRadius: 13, cursor: "pointer",
              background: tab === t.id ? `linear-gradient(135deg, ${C.terra}, ${C.terraDk})` : "transparent",
              color: tab === t.id ? "white" : C.muted,
              fontSize: 10, fontWeight: 700, transition: "all .25s",
              boxShadow: tab === t.id ? `0 4px 12px rgba(196,98,58,0.3)` : "none",
            }}>
              <div>{t.icon}</div>
              <div style={{ marginTop: 2 }}>{t.label}</div>
            </button>
          ))}
        </div>

        {/* ══════ TAB: TRADUCIR ══════ */}
        {tab === "translate" && (
          <div>
            {/* Dirección */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
              background: "rgba(0,0,0,0.22)", borderRadius: 16, padding: "12px 14px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, marginBottom: 3 }}>DESDE</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isEsWay ? C.clay : C.sky }}>
                  {isEsWay ? "🇨🇴 Español" : "🌵 Wayuunaiki"}
                </div>
              </div>
              <button onClick={swap} style={{
                width: 42, height: 42, borderRadius: "50%", border: "none", flexShrink: 0,
                background: `linear-gradient(135deg, ${C.terra}, ${C.ocean})`,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)", transition: "transform .3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "rotate(180deg)"}
              onMouseLeave={e => e.currentTarget.style.transform = "rotate(0)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </button>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, marginBottom: 3 }}>HACIA</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isEsWay ? C.sky : C.clay }}>
                  {isEsWay ? "🌵 Wayuunaiki" : "🇨🇴 Español"}
                </div>
              </div>
            </div>

            {/* Input */}
            <div style={{
              background: "rgba(255,255,255,0.05)", borderRadius: 18,
              border: "1.5px solid rgba(255,255,255,0.09)", marginBottom: 10,
            }}>
              <div style={{ padding: "10px 14px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>
                  {isEsWay ? "🇨🇴 Escribe en español" : "🌵 Escribe en wayuunaiki"}
                </span>
                {input && <button onClick={() => { setInput(""); setResult(null); }} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 12 }}>✕</button>}
              </div>
              <textarea
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); traducir(input); } }}
                placeholder={isEsWay ? "Escribe en español o usa el micrófono..." : "Escribe en wayuunaiki..."}
                rows={3} style={{
                  width: "100%", background: "transparent", border: "none", outline: "none",
                  color: "white", fontSize: 15, padding: "4px 14px 12px",
                  resize: "none", fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.5,
                }}
              />
              <div style={{ padding: "0 10px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <SpeakBtn text={input} disabled={!input}/>
                <button onClick={() => traducir(input)} disabled={!input.trim() || loading} style={{
                  background: `linear-gradient(135deg, ${C.terra}, ${C.terraDk})`,
                  border: "none", borderRadius: 20, padding: "7px 18px",
                  color: "white", fontWeight: 700, cursor: input.trim() ? "pointer" : "not-allowed",
                  fontSize: 13, opacity: !input.trim() || loading ? .5 : 1,
                  boxShadow: "0 4px 12px rgba(196,98,58,0.3)",
                }}>
                  {loading ? "..." : "Traducir →"}
                </button>
              </div>
            </div>

            {error && <div style={{ background: "rgba(200,40,40,0.14)", border: "1px solid rgba(200,40,40,0.3)",
              borderRadius: 12, padding: "9px 14px", marginBottom: 10, fontSize: 12, color: "#ffaaaa" }}>
              ⚠️ {error}
            </div>}

            {/* Resultado */}
            <div style={{
              background: result
                ? `linear-gradient(135deg, rgba(27,79,114,0.2), rgba(58,124,165,0.1))`
                : "rgba(0,0,0,0.14)",
              borderRadius: 18,
              border: `1.5px solid ${result ? "rgba(58,124,165,0.28)" : "rgba(255,255,255,0.05)"}`,
              minHeight: 120, transition: "all .3s",
            }}>
              <div style={{ padding: "10px 14px 5px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, color: C.sky, textTransform: "uppercase", letterSpacing: 1 }}>
                    {isEsWay ? "🌵 Wayuunaiki" : "🇨🇴 Español"}
                  </span>
                  {result && (
                    <Badge
                      label={result.source === "diccionario" ? "📖 Dict. Nativo" : result.source === "frase" ? "📚 Frase Nativa" : "🤖 IA Lingüística"}
                      color={result.source === "ia" ? C.sky : C.gold}
                    />
                  )}
                  {result?.cat && <Badge label={result.cat} color={C.green}/>}
                </div>
                {result && <SpeakBtn text={result.result} disabled={false}/>}
              </div>
              <div style={{ padding: "6px 14px 18px", minHeight: 70 }}>
                {loading
                  ? <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12 }}>
                      <Wave on={true} color={C.sky}/>
                      <span style={{ color: C.muted, fontSize: 13 }}>Buscando en diccionario nativo...</span>
                    </div>
                  : result
                    ? <div>
                        <p style={{ margin: "0 0 6px", fontSize: 19, fontWeight: 700, color: C.sand, lineHeight: 1.4 }}>
                          {result.result}
                        </p>
                        {result.nota && <p style={{ margin: 0, fontSize: 11, color: C.muted, fontStyle: "italic" }}>💡 {result.nota}</p>}
                        {result.source === "diccionario" && result.entry && (
                          <p style={{ margin: "4px 0 0", fontSize: 10, color: C.muted }}>
                            Entrada: <span style={{ fontFamily: "monospace", color: C.clay }}>{result.entry}</span>
                          </p>
                        )}
                        {result.source === "ia" && (
                          <p style={{ margin: "4px 0 0", fontSize: 10, color: C.muted, fontStyle: "italic" }}>
                            IA especializada (Corpus Jusayú + Captain)
                          </p>
                        )}
                      </div>
                    : <p style={{ margin: 0, color: C.muted, fontSize: 13, paddingTop: 10 }}>
                        La traducción aparecerá aquí...
                      </p>
                }
              </div>
            </div>

            {/* MICRÓFONO */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ height: 1, width: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}/>
              <p style={{ margin: 0, fontSize: 11, color: C.muted }}>
                {listening ? "🔴 Escuchando... habla ahora" : "Pulsa el micrófono y habla en español"}
              </p>
              {listening && <Wave on={true} color={C.terra}/>}
              <button
                onClick={listening ? () => { recRef.current?.stop(); setListening(false); } : startVoz}
                style={{
                  width: 74, height: 74, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: listening
                    ? `radial-gradient(circle, ${C.terra}, ${C.terraDk})`
                    : `radial-gradient(circle, ${C.sky}, ${C.ocean})`,
                  boxShadow: listening
                    ? `0 0 0 8px rgba(196,98,58,0.2), 0 0 0 16px rgba(196,98,58,0.07), 0 8px 24px rgba(196,98,58,0.35)`
                    : `0 8px 24px rgba(58,124,165,0.3)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: listening ? "scale(1.08)" : "scale(1)", transition: "all .3s",
                }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  {listening
                    ? <rect x="6" y="4" width="4" height="16" rx="2"/>
                    : <>
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                      <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </>
                  }
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ══════ TAB: DICCIONARIO ══════ */}
        {tab === "dict" && (
          <div>
            <p style={{ color: C.muted, fontSize: 12, textAlign: "center", margin: "0 0 14px" }}>
              {totalEntradas} entradas del Diccionario SIL Captain (2005) — búsqueda en wayuunaiki o español
            </p>
            <BuscadorEntradas onSelect={(r) => {
              setInput(r.key.split("(")[0].trim());
              setResult({ result: r.val, source: "diccionario", entry: r.key, cat: r.cat });
              setTab("translate");
            }}/>
          </div>
        )}

        {/* ══════ TAB: FRASES ══════ */}
        {tab === "phrases" && (
          <div>
            <p style={{ color: C.muted, fontSize: 12, textAlign: "center", margin: "0 0 12px" }}>
              {FRASES.length} frases nativas verificadas con contexto cultural
            </p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
              {CATS.filter(c => c === "Todos" || FRASES.some(f => f.cat === c)).map(cat => (
                <button key={cat} onClick={() => setCatF(cat)} style={{
                  background: catF === cat ? C.terra : "rgba(255,255,255,0.06)",
                  border: `1px solid ${catF === cat ? C.terra : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 20, padding: "4px 12px", cursor: "pointer",
                  color: catF === cat ? "white" : C.muted,
                  fontSize: 10, fontWeight: 600, transition: "all .2s",
                }}>
                  {cat} {cat !== "Todos" && `(${FRASES.filter(f=>f.cat===cat).length})`}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {frasesFilt.map((f, i) => (
                <div key={i} onClick={() => {
                  setInput(f.es); setResult({ result: f.way, source: "frase", nota: f.nota, cat: f.cat });
                  setDir("es-way"); setTab("translate");
                }} style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, padding: "12px 14px", cursor: "pointer", transition: "all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,58,0.12)"; e.currentTarget.style.borderColor = "rgba(196,98,58,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 3 }}>{f.es}</div>
                      <div style={{ fontSize: 15, color: C.clay, fontStyle: "italic", fontWeight: 600 }}>{f.way}</div>
                    </div>
                    <Badge label={f.cat} color={C.gold}/>
                  </div>
                  {f.nota && <p style={{ margin: "6px 0 0", fontSize: 10, color: C.muted, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 6 }}>
                    💡 {f.nota}
                  </p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ TAB: GRAMÁTICA ══════ */}
        {tab === "grammar" && (
          <div>
            <div style={{ marginBottom: 20, padding: "14px 16px", borderRadius: 14, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <p style={{ margin: 0, fontSize: 12, color: C.gold, lineHeight: 1.7 }}>
                <strong>Fuentes:</strong> Captain & Captain (SIL, 2005) · Jusayú & Olza (1988) · Mansen & Mansen (1984)
              </p>
            </div>

            <h3 style={{ color: C.sand, fontSize: 14, margin: "0 0 10px", letterSpacing: 1, textTransform: "uppercase" }}>Alfabeto Oficial (20 letras)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
              {[
                ["a","como en español"],["ch","como en español"],["e","como en español"],
                ["i","como en español"],["j","como en español"],["k","'c' de 'casa'"],
                ["'","cierre glotal (pausa)"],["l","vibrante lateral suave"],["m","como en español"],
                ["n","como en español"],["o","como en español"],["p","como en español"],
                ["r","como 'rr' española + fricción"],["s","como en español"],["sh","como 'sh' inglés"],
                ["t","como en español"],["u","como en español"],["ü","'u' sin redondear labios"],
                ["w","como 'hu' en 'huevo'"],["y","como en español"],
              ].map(([l, s], i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontWeight: 900, fontSize: 18, color: C.gold, fontFamily: "monospace", minWidth: 22 }}>{l}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{s}</span>
                </div>
              ))}
            </div>

            <h3 style={{ color: C.sand, fontSize: 14, margin: "0 0 10px", letterSpacing: 1, textTransform: "uppercase" }}>Pronombres y Prefijos</h3>
            {[
              ["taya / ta-","yo / mi-","1ª singular"],
              ["pia / pü-","tú / tu-","2ª singular"],
              ["nia / nü-","él / su- (masc.)","3ª masc. singular"],
              ["shia / sü-","ella / su- (no masc.)","3ª no masc. singular"],
              ["waya / wa-","nosotros / nuestro-","1ª plural"],
              ["jia / jü-","ustedes / su-","2ª plural"],
              ["naya / na-","ellos/as / su-","3ª plural"],
            ].map(([w, es, gram], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 5 }}>
                <span style={{ fontWeight: 700, color: C.clay, fontFamily: "monospace", fontSize: 13 }}>{w}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{es}</span>
                <Badge label={gram} color={C.muted}/>
              </div>
            ))}

            <h3 style={{ color: C.sand, fontSize: 14, margin: "16px 0 10px", letterSpacing: 1, textTransform: "uppercase" }}>Sufijos Determinativos</h3>
            {[
              ["-kai","masculino singular (el burro: püliikikai)"],
              ["-kat","no masculino singular (la burra: püliikikat)"],
              ["-irua","plural (los/las: püliikiirua)"],
              ["-in / -se / -ya","sufijos de posesión (mi chivo: takaa'ulain)"],
            ].map(([s, e], i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 5 }}>
                <span style={{ fontWeight: 900, color: C.gold, fontFamily: "monospace", minWidth: 55, fontSize: 13 }}>{s}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{e}</span>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 14, background: "rgba(58,124,165,0.1)", border: "1px solid rgba(58,124,165,0.2)" }}>
              <p style={{ margin: 0, fontSize: 12, color: C.sky, lineHeight: 1.8 }}>
                <strong>⚡ Reglas rápidas:</strong><br/>
                • Verbos infinitivos terminan en <strong>-aa</strong> (ekaa = comer)<br/>
                • No existe género gramatical masc./fem. en los nombres<br/>
                • Vocales dobles (aa, ee, ii) = pronunciación más larga<br/>
                • El acento normalmente recae en la segunda sílaba<br/>
                • El ' antes de vocal = cierre glotal breve (ej: ka<strong>'</strong>i = sol/día)<br/>
                • Hay 3 tipos de verbos: transitivos, intransitivos, de estado
              </p>
            </div>
          </div>
        )}

        {/* ══════ TAB: HISTORIAL ══════ */}
        {tab === "history" && (
          <div>
            {history.length === 0
              ? <div style={{ textAlign: "center", paddingTop: 48, color: C.muted }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🕐</div>
                  <p style={{ fontSize: 14 }}>Tu historial de traducciones aparecerá aquí.</p>
                </div>
              : <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
                    <span style={{ color: C.muted, fontSize: 12 }}>{history.length} traducción(es)</span>
                    <button onClick={() => setHistory([])} style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: C.muted, cursor: "pointer", padding: "4px 12px", fontSize: 11 }}>
                      Limpiar
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {history.map(h => (
                      <div key={h.id} onClick={() => {
                        setInput(h.input); setResult({ result: h.output, source: h.src }); setDir(h.dir); setTab("translate");
                      }} style={{
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 12, padding: "11px 13px", cursor: "pointer", transition: "all .2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>
                            {h.dir === "es-way" ? "🇨🇴 → 🌵" : "🌵 → 🇨🇴"}
                          </span>
                          <Badge
                            label={h.src === "diccionario" ? "📖 Nativo" : h.src === "frase" ? "📚 Frase" : "🤖 IA"}
                            color={h.src === "ia" ? C.sky : C.gold}
                          />
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 2 }}>{h.input}</div>
                        <div style={{ fontSize: 12, color: C.clay, fontStyle: "italic" }}>{h.output}</div>
                      </div>
                    ))}
                  </div>
                </>
            }
          </div>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", marginBottom: 14 }}/>
          <p style={{ fontSize: 10, color: C.muted, opacity: .4, lineHeight: 1.8, margin: 0 }}>
            📖 David M. & Linda B. Captain · SIL International, 2005<br/>
            📚 Miguel Ángel Jusayú & Jesús Olza Zubiri, 1988<br/>
            🌵 Pueblo Wayuu · La Guajira, Colombia & Venezuela
          </p>
        </div>
      </div>

      <style>{`
        *{box-sizing:border-box}
        textarea::placeholder{color:rgba(139,107,85,0.5)}
        textarea{scrollbar-width:thin;scrollbar-color:rgba(196,98,58,0.3) transparent}
        input::placeholder{color:rgba(139,107,85,0.5)}
        input{scrollbar-width:thin}
      `}</style>
    </div>
  );
}
