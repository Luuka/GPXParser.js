let gpxParser = require('../src/GPXParser.js');
let assert = require('assert');
require('jsdom-global')();
global.DOMParser = window.DOMParser;

let gpxDemo = '<?xml version="1.0" encoding="UTF-8" ?><gpx version="1.1" creator="Raidy"><metadata><name>GPX DEMO</name><desc>A full featured gpx demo file</desc><author><name>Demo Author</name><email id="demo" domain="example.com"></email><link href="http://example.com"><text>Author website</text><type>Web</type></link></author><copyright author="Lucas Trebouet Voisin"><year>2020</year><license>MIT</license></copyright><link href="http://example.com"><text>Author website</text><type>Web</type></link><time>2020-01-12T21:32:52</time><keywords>Demo, gpx, file</keywords><bounds minlat="49.12965660728301" minlon="-1.5521714646550901" maxlat="45.85097922514941" maxlon="4.336738935765406"></bounds></metadata><wpt lat="47.253146555709" lon="-1.5153741828293"><name>Porte de Carquefou</name><desc>Route</desc><ele>35</ele><cmt>Warning</cmt><sym>Fishing Hot Spot Facility</sym></wpt><wpt lat="47.235331031612" lon="-1.5482325613225"><name>Pont de la Tortière</name><desc>Route</desc><ele>20</ele><cmt>Bridge</cmt></wpt><trk><name>Track</name><cmt>Bridge</cmt><desc>Demo track</desc><src>GPX Parser</src><number>1</number><link href="http://example.com"><text>Author website</text><type>Web</type></link><type>MTB</type><trkseg><trkpt lat="47.2278526991611" lon="-1.5521714646550901"><ele>12.36</ele></trkpt><trkpt lat="47.229236980562256" lon="-1.5504753767742476"><ele>7.08</ele></trkpt><trkpt lat="47.2301112449252" lon="-1.5493804339650867"><ele>7.07</ele></trkpt><trkpt lat="47.230562942529104" lon="-1.5485645942249218"><ele>7.44</ele></trkpt><trkpt lat="47.2308980705218" lon="-1.5479634491532404"><ele>6.52</ele></trkpt><trkpt lat="47.231568320149904" lon="-1.5475984682168467"><ele>7.13</ele></trkpt><trkpt lat="47.231881586091085" lon="-1.547362304081539"><ele>6.24</ele></trkpt><trkpt lat="47.23243526090039" lon="-1.5471690788799202"><ele>5.55</ele></trkpt><trkpt lat="47.23312006121551" lon="-1.547233487280473"><ele>5.36</ele></trkpt><trkpt lat="47.23377571279966" lon="-1.5475984682168467"><ele>5.75</ele></trkpt><trkpt lat="47.234183669691376" lon="-1.5477487544847772"><ele>5.83</ele></trkpt><trkpt lat="47.234409501620256" lon="-1.547619937683691"><ele>8.49</ele></trkpt><trkpt lat="47.234948580398594" lon="-1.5477702239516211"><ele>8.66</ele></trkpt><trkpt lat="47.23521083295654" lon="-1.5481137354211507"><ele>7.27</ele></trkpt><trkpt lat="47.23559692463824" lon="-1.548242552222237"><ele>7.26</ele></trkpt><trkpt lat="47.23609228343066" lon="-1.5483498995564584"><ele>5.35</ele></trkpt><trkpt lat="47.23652936087253" lon="-1.5486719415591634"><ele>5.2</ele></trkpt><trkpt lat="47.23677703648927" lon="-1.5491228003629345"><ele>5.19</ele></trkpt><trkpt lat="47.23699557283679" lon="-1.5493374950313978"><ele>5.07</ele></trkpt><trkpt lat="47.237148547743764" lon="-1.5493658305611806"><ele>5.78</ele></trkpt><trkpt lat="47.23736708255907" lon="-1.5493658305611806"><ele>5.35</ele></trkpt><trkpt lat="47.2376730297863" lon="-1.5490759927587618"><ele>5.53</ele></trkpt><trkpt lat="47.23784057156692" lon="-1.5489042370239872"><ele>5.01</ele></trkpt><trkpt lat="47.237978975246975" lon="-1.5489740127912315"><ele>4.09</ele></trkpt><trkpt lat="47.23888951676074" lon="-1.5481098667506867"><ele>4.23</ele></trkpt><trkpt lat="47.238998780690885" lon="-1.5482064793514863"><ele>4.09</ele></trkpt><trkpt lat="47.23966164370378" lon="-1.5476321711133405"><ele>4.09</ele></trkpt><trkpt lat="47.23975269566766" lon="-1.5474765174787188"><ele>4.09</ele></trkpt><trkpt lat="47.24020431109555" lon="-1.54703639340837"><ele>4.09</ele></trkpt><trkpt lat="47.24022616335733" lon="-1.5468002292730623"><ele>4.9</ele></trkpt><trkpt lat="47.24038641300163" lon="-1.546596269338021"><ele>5.16</ele></trkpt><trkpt lat="47.24063407058944" lon="-1.546478187270357"><ele>5.33</ele></trkpt><trkpt lat="47.24102740673183" lon="-1.546381574669558"><ele>5.32</ele></trkpt><trkpt lat="47.24142802387509" lon="-1.5461561452676722"><ele>5.45</ele></trkpt><trkpt lat="47.24194517970785" lon="-1.5458663074652537"><ele>4.97</ele></trkpt><trkpt lat="47.24209085649593" lon="-1.5457374906641677"><ele>5.04</ele></trkpt><trkpt lat="47.24195974740468" lon="-1.5453617749943518"><ele>5.44</ele></trkpt><trkpt lat="47.24191604430218" lon="-1.5448787119903142"><ele>5.35</ele></trkpt><trkpt lat="47.241919686228734" lon="-1.5445996089213179"><ele>5.99</ele></trkpt><trkpt lat="47.242087214581105" lon="-1.544427853186543"><ele>6.75</ele></trkpt><trkpt lat="47.24220375573113" lon="-1.544299036385477"><ele>6.25</ele></trkpt><trkpt lat="47.24232393852363" lon="-1.5438589123151283"><ele>6.13</ele></trkpt><trkpt lat="47.242382208870325" lon="-1.5435690745127097"><ele>5.92</ele></trkpt><trkpt lat="47.24252060068689" lon="-1.5433007061771153"><ele>6</ele></trkpt><trkpt lat="47.24270997837632" lon="-1.5431826241094717"><ele>5.88</ele></trkpt><trkpt lat="47.24289571352954" lon="-1.5431128483422276"><ele>6.38</ele></trkpt><trkpt lat="47.24331816753158" lon="-1.5436817892136425"><ele>6.99</ele></trkpt><trkpt lat="47.243777036165056" lon="-1.544229260618213"><ele>6.7</ele></trkpt><trkpt lat="47.243980976504155" lon="-1.5442077911513687"><ele>7.21</ele></trkpt><trkpt lat="47.24434879548787" lon="-1.5439233207156613"><ele>7.3</ele></trkpt><trkpt lat="47.24464741892296" lon="-1.5437945039145953"><ele>7.68</ele></trkpt><trkpt lat="47.2457872709489" lon="-1.5431718893760493"><ele>7.99</ele></trkpt><trkpt lat="47.245991203548975" lon="-1.543783769181173"><ele>6.74</ele></trkpt><trkpt lat="47.24612958593761" lon="-1.5440628722501695"><ele>6.25</ele></trkpt><trkpt lat="47.24635536695347" lon="-1.5439769943827721"><ele>6.12</ele></trkpt><trkpt lat="47.24656658058094" lon="-1.5437193607806199"><ele>8.02</ele></trkpt><trkpt lat="47.24677051018078" lon="-1.543375849311091"><ele>7.71</ele></trkpt><trkpt lat="47.24693802319328" lon="-1.543064542041808"><ele>6.27</ele></trkpt><trkpt lat="47.24695258951716" lon="-1.5428498473733445"><ele>5.5</ele></trkpt><trkpt lat="47.246843341990434" lon="-1.5426351527049011"><ele>5.73</ele></trkpt><trkpt lat="47.246843341990434" lon="-1.5423667843693072"><ele>6.13</ele></trkpt><trkpt lat="47.246919815282794" lon="-1.5422111307346855"><ele>5.76</ele></trkpt><trkpt lat="47.247027241864174" lon="-1.5421440622402474"><ele>5.55</ele></trkpt><trkpt lat="47.24726758529114" lon="-1.5419669391387614"><ele>5.69</ele></trkpt><trkpt lat="47.247606249178126" lon="-1.541776397620498"><ele>5.23</ele></trkpt><trkpt lat="47.24779560868725" lon="-1.541373845117127"><ele>5.33</ele></trkpt><trkpt lat="47.24797040147941" lon="-1.541067905214575"><ele>5.41</ele></trkpt><trkpt lat="47.248090571189444" lon="-1.540890782113089"><ele>5.45</ele></trkpt><trkpt lat="47.24820163689111" lon="-1.5407807510955118"><ele>5.48</ele></trkpt><trkpt lat="47.2481979953964" lon="-1.5405499543269154"><ele>6.33</ele></trkpt><trkpt lat="47.248183429414986" lon="-1.5403459943918743"><ele>7.2</ele></trkpt><trkpt lat="47.24826718375332" lon="-1.5402440144243439"><ele>7.65</ele></trkpt><trkpt lat="47.24837642834339" lon="-1.5401151976232779"><ele>8.54</ele></trkpt><trkpt lat="47.24851480450069" lon="-1.540013217655747"><ele>8.63</ele></trkpt><trkpt lat="47.24867867053525" lon="-1.53992733978837"><ele>8.42</ele></trkpt><trkpt lat="47.24869323638044" lon="-1.5397582677369506"><ele>8.79</ele></trkpt><trkpt lat="47.248726009517505" lon="-1.5395195079957926"><ele>8.23</ele></trkpt><trkpt lat="47.248740575349686" lon="-1.5393262827941736"><ele>8.87</ele></trkpt><trkpt lat="47.248806121544945" lon="-1.5392511396602184"><ele>8.14</ele></trkpt><trkpt lat="47.24899547676449" lon="-1.5392681794411647"><ele>5.41</ele></trkpt><trkpt lat="47.249232169836965" lon="-1.5394184657090753"><ele>5.5</ele></trkpt><trkpt lat="47.24936690234428" lon="-1.5395687519770054"><ele>6.63</ele></trkpt><trkpt lat="47.249474323962616" lon="-1.5397458750784914"><ele>6.14</ele></trkpt><trkpt lat="47.249594490260584" lon="-1.539804916112313"><ele>5.51</ele></trkpt><trkpt lat="47.24971465628591" lon="-1.5398102834790244"><ele>5.32</ele></trkpt><trkpt lat="47.24982025650735" lon="-1.5396438951109606"><ele>5.64</ele></trkpt><trkpt lat="47.24992949789414" lon="-1.5393433225751199"><ele>6.26</ele></trkpt><trkpt lat="47.250046021791725" lon="-1.5391876689404784"><ele>7.35</ele></trkpt><trkpt lat="47.250158904073054" lon="-1.5390856889729678"><ele>5.63</ele></trkpt><trkpt lat="47.25030819962399" lon="-1.5389407700717483"><ele>6.12</ele></trkpt><trkpt lat="47.25016254543296" lon="-1.5383074207997807"><ele>7.46</ele></trkpt><trkpt lat="47.2503609991693" lon="-1.538218859249048"><ele>5.76</ele></trkpt><trkpt lat="47.25050665281458" lon="-1.5383315739499805"><ele>5.88</ele></trkpt><trkpt lat="47.250645023406534" lon="-1.538573105451999"><ele>5.37</ele></trkpt><trkpt lat="47.25072149121014" lon="-1.538696554886374"><ele>5.38</ele></trkpt><trkpt lat="47.250845295991475" lon="-1.5387690143369737"><ele>5.81</ele></trkpt><trkpt lat="47.250976383091555" lon="-1.5388280553708156"><ele>6.67</ele></trkpt><trkpt lat="47.25109290468588" lon="-1.5389246679716155"><ele>6.69</ele></trkpt><trkpt lat="47.25126222467073" lon="-1.5389219842882598"><ele>6.6</ele></trkpt><trkpt lat="47.25142972347799" lon="-1.538814636954038"><ele>6.62</ele></trkpt><trkpt lat="47.25163545498368" lon="-1.5387126569865077"><ele>6.64</ele></trkpt><trkpt lat="47.25185393004397" lon="-1.538664350686108"><ele>6</ele></trkpt><trkpt lat="47.25217435850211" lon="-1.5385892075521526"><ele>6.21</ele></trkpt><trkpt lat="47.25231090413097" lon="-1.5385140644181774"><ele>6.32</ele></trkpt><trkpt lat="47.252511170416426" lon="-1.5383208392165582"><ele>6.74</ele></trkpt><trkpt lat="47.25268776823983" lon="-1.5381973897822034"><ele>7</ele></trkpt><trkpt lat="47.25292262422664" lon="-1.538135665065026"><ele>6.07</ele></trkpt><trkpt lat="47.25317204378541" lon="-1.5380846750812507"><ele>5.44</ele></trkpt><trkpt lat="47.25360898032695" lon="-1.5381437161150926"><ele>5.26</ele></trkpt><trkpt lat="47.25385111444129" lon="-1.5382161755656922"><ele>5.21</ele></trkpt><trkpt lat="47.25440820075614" lon="-1.5382161755656922"><ele>5.45</ele></trkpt><trkpt lat="47.25462666437794" lon="-1.5383127881664915"><ele>6.63</ele></trkpt><trkpt lat="47.25500351200727" lon="-1.538323522899914"><ele>6.05</ele></trkpt><trkpt lat="47.2551600759343" lon="-1.5382752165995142"><ele>6.28</ele></trkpt><trkpt lat="47.25534030592833" lon="-1.5382913186996474"><ele>7.92</ele></trkpt><trkpt lat="47.25551143282967" lon="-1.5382644818660922"><ele>8.97</ele></trkpt><trkpt lat="47.25563886739697" lon="-1.538200073465559"><ele>8.38</ele></trkpt><trkpt lat="47.25560609853752" lon="-1.5380336850974954"><ele>9.97</ele></trkpt><trkpt lat="47.255547842737336" lon="-1.5376096631272798"><ele>14.24</ele></trkpt><trkpt lat="47.25545681792125" lon="-1.5372500495576173"><ele>15.68</ele></trkpt><trkpt lat="47.25531663939845" lon="-1.5367133128864487"><ele>17.92</ele></trkpt><trkpt lat="47.25524381924016" lon="-1.5363536993167861"><ele>19.38</ele></trkpt><trkpt lat="47.25520376811039" lon="-1.5362678214493888"><ele>19.39</ele></trkpt><trkpt lat="47.25520012709712" lon="-1.5361520574285596"><ele>20</ele></trkpt><trkpt lat="47.25521287064256" lon="-1.5360048204805254"><ele>19.34</ele></trkpt><trkpt lat="47.25514733237614" lon="-1.5355969006104433"><ele>20.72</ele></trkpt><trkpt lat="47.25507633249603" lon="-1.53471396878641"><ele>20.72</ele></trkpt><trkpt lat="47.254974383783726" lon="-1.533817618545579"><ele>22.28</ele></trkpt><trkpt lat="47.254886999016975" lon="-1.532985676705281"><ele>24.1</ele></trkpt><trkpt lat="47.25479597306492" lon="-1.532352327433313"><ele>25.24</ele></trkpt><trkpt lat="47.25479597306492" lon="-1.5319631933467195"><ele>26.07</ele></trkpt><trkpt lat="47.25478504994015" lon="-1.5315123345429684"><ele>26.71</ele></trkpt><trkpt lat="47.25476684472721" lon="-1.5310883125727528"><ele>26.65</ele></trkpt><trkpt lat="47.25475592159644" lon="-1.5308655668542228"><ele>26.46</ele></trkpt><trkpt lat="47.25475228055235" lon="-1.5307367500531366"><ele>26.31</ele></trkpt><trkpt lat="47.25469402381286" lon="-1.5306669742858925"><ele>26.2</ele></trkpt><trkpt lat="47.25468310066708" lon="-1.5305327901180956"><ele>26</ele></trkpt><trkpt lat="47.254679459617975" lon="-1.5303878712168963"><ele>25.8</ele></trkpt><trkpt lat="47.25467581856862" lon="-1.5302107481154106"><ele>25.68</ele></trkpt><trkpt lat="47.25469038276452" lon="-1.5300711965809024"><ele>25.71</ele></trkpt><trkpt lat="47.25470858800375" lon="-1.5298779713792836"><ele>26.03</ele></trkpt><trkpt lat="47.2547049469564" lon="-1.5296149704104203"><ele>25.23</ele></trkpt><trkpt lat="47.2547686652488" lon="-1.5294620004591544"><ele>24.92</ele></trkpt><trkpt lat="47.25477958837692" lon="-1.5293331836580681"><ele>24.69</ele></trkpt><trkpt lat="47.2547067674801" lon="-1.5291748463400714"><ele>24.86</ele></trkpt><trkpt lat="47.25467763909334" lon="-1.5289869885051635"><ele>24.5</ele></trkpt><trkpt lat="47.25467035699414" lon="-1.5286434770356339"><ele>24.61</ele></trkpt><trkpt lat="47.25463940806139" lon="-1.528203352965285"><ele>24.47</ele></trkpt><trkpt lat="47.25460117700185" lon="-1.527623677360428"><ele>25.12</ele></trkpt><trkpt lat="47.25460481805632" lon="-1.527145981723102"><ele>23.99</ele></trkpt><trkpt lat="47.25459025383688" lon="-1.5266146124186644"><ele>25.07</ele></trkpt><trkpt lat="47.25456840750026" lon="-1.526260366215693"><ele>25.34</ele></trkpt><trkpt lat="47.25445917568184" lon="-1.5255626085431921"><ele>26.68</ele></trkpt><trkpt lat="47.25440820075614" lon="-1.5246877277692252"><ele>29.45</ele></trkpt><trkpt lat="47.25434266149388" lon="-1.5244247268003424"><ele>30.65</ele></trkpt><trkpt lat="47.25426619891869" lon="-1.5241939300317453"><ele>31.6</ele></trkpt><trkpt lat="47.25408414472389" lon="-1.523963133263149"><ele>30.66</ele></trkpt><trkpt lat="47.2539530653161" lon="-1.5236679280940195"><ele>30.86</ele></trkpt><trkpt lat="47.253862037758694" lon="-1.523388825025023"><ele>29.7</ele></trkpt><trkpt lat="47.2539166543119" lon="-1.5231633956231372"><ele>29.99</ele></trkpt><trkpt lat="47.25396762971077" lon="-1.5230882524891824"><ele>29.81</ele></trkpt><trkpt lat="47.25390026935185" lon="-1.5228684251997104"><ele>29.61</ele></trkpt><trkpt lat="47.25417699244144" lon="-1.5226268936976919"><ele>26.75</ele></trkpt><trkpt lat="47.25396762971077" lon="-1.5220257486259905"><ele>28.96</ele></trkpt><trkpt lat="47.25379649782045" lon="-1.5214433893377777"><ele>29.51</ele></trkpt><trkpt lat="47.25365813546229" lon="-1.5209281221334738"><ele>28.59</ele></trkpt><trkpt lat="47.25356710739791" lon="-1.5206060801307888"><ele>28.69</ele></trkpt><trkpt lat="47.25343966784493" lon="-1.5201820581605732"><ele>28.56</ele></trkpt><trkpt lat="47.253173864361806" lon="-1.5193876878872528"><ele>28.4</ele></trkpt><trkpt lat="47.25287893016843" lon="-1.5186121033974411"><ele>26.22</ele></trkpt><trkpt lat="47.25264225339324" lon="-1.5179894888588952"><ele>27.01</ele></trkpt><trkpt lat="47.252525735207655" lon="-1.517844569957696"><ele>27.18</ele></trkpt><trkpt lat="47.252425602187124" lon="-1.5176958759779269"><ele>27.45</ele></trkpt><trkpt lat="47.252449270009066" lon="-1.5174731715409355"><ele>28.61</ele></trkpt><trkpt lat="47.252414675048755" lon="-1.517219535347867"><ele>29.03</ele></trkpt><trkpt lat="47.25240375495748" lon="-1.5171033097703248"><ele>29.13</ele></trkpt><trkpt lat="47.252356419262334" lon="-1.5170174319029472"><ele>29.29</ele></trkpt><trkpt lat="47.25218164094453" lon="-1.5167222267338178"><ele>29.15</ele></trkpt><trkpt lat="47.25244016700186" lon="-1.516341143697291"><ele>30.55</ele></trkpt><trkpt lat="47.25266227993055" lon="-1.5158473459598312"><ele>31.28</ele></trkpt><trkpt lat="47.25273328304731" lon="-1.5155521407907016"><ele>30.7</ele></trkpt><trkpt lat="47.25278790076468" lon="-1.515192527221019"><ele>30.12</ele></trkpt><trkpt lat="47.25279154194383" lon="-1.5149617304524226"><ele>29.49</ele></trkpt><trkpt lat="47.2526986917972" lon="-1.514722882633759"><ele>28.42</ele></trkpt><trkpt lat="47.25254576178903" lon="-1.5144384121980516"><ele>27.87</ele></trkpt><trkpt lat="47.25240921676574" lon="-1.5141727275458128"><ele>28.45</ele></trkpt><trkpt lat="47.25199047649899" lon="-1.5132280710045822"><ele>24.87</ele></trkpt><trkpt lat="47.251589939232694" lon="-1.512208271329396"><ele>24.8</ele></trkpt><trkpt lat="47.25120760537993" lon="-1.5112904516217212"><ele>22.23</ele></trkpt><trkpt lat="47.25059768613944" lon="-1.5100693756948493"><ele>23.52</ele></trkpt><trkpt lat="47.25022991054609" lon="-1.5093823527557506"><ele>24.23</ele></trkpt><trkpt lat="47.2500660493108" lon="-1.5090764128531986"><ele>24.84</ele></trkpt><trkpt lat="47.24995680820565" lon="-1.5087704729506468"><ele>22.79</ele></trkpt><trkpt lat="47.24978202196872" lon="-1.508206899445923"><ele>18.76</ele></trkpt><trkpt lat="47.24974924948506" lon="-1.5080297763444575"><ele>17.72</ele></trkpt><trkpt lat="47.249385109413545" lon="-1.5072005181875152"><ele>17.28</ele></trkpt><trkpt lat="47.24931956393483" lon="-1.5072005181875152"><ele>18.25</ele></trkpt><trkpt lat="47.24899183532436" lon="-1.5065391544091324"><ele>17.32</ele></trkpt><trkpt lat="47.248720547329405" lon="-1.5060158361547618"><ele>17.34</ele></trkpt><trkpt lat="47.24847838975751" lon="-1.5055193547339263"><ele>17.4</ele></trkpt><trkpt lat="47.248238051824586" lon="-1.505081914346933"><ele>17.76</ele></trkpt><trkpt lat="47.247435096731685" lon="-1.5041372578057024"><ele>14.51</ele></trkpt><trkpt lat="47.24735134107764" lon="-1.5040513799383248"><ele>14.29</ele></trkpt><trkpt lat="47.24733677486341" lon="-1.5038796242035501"><ele>14.01</ele></trkpt><trkpt lat="47.24726758529114" lon="-1.5037400726690622"><ele>13.96</ele></trkpt></trkseg></trk><rte><name>Track</name><cmt>Bridge</cmt><desc>Demo track</desc><src>GPX Parser</src><number>1</number><link href="http://example.com"><text>Author website</text><type>Web</type></link><type>MTB</type><rtept lat="47.2278526991611" lon="-1.5521714646550901"><ele>12.36</ele></rtept><rtept lat="47.229236980562256" lon="-1.5504753767742476"><ele>7.08</ele></rtept><rtept lat="47.2301112449252" lon="-1.5493804339650867"><ele>7.07</ele></rtept><rtept lat="47.230562942529104" lon="-1.5485645942249218"><ele>7.44</ele></rtept><rtept lat="47.2308980705218" lon="-1.5479634491532404"><ele>6.52</ele></rtept><rtept lat="47.231568320149904" lon="-1.5475984682168467"><ele>7.13</ele></rtept><rtept lat="47.231881586091085" lon="-1.547362304081539"><ele>6.24</ele></rtept><rtept lat="47.23243526090039" lon="-1.5471690788799202"><ele>5.55</ele></rtept><rtept lat="47.23312006121551" lon="-1.547233487280473"><ele>5.36</ele></rtept><rtept lat="47.23377571279966" lon="-1.5475984682168467"><ele>5.75</ele></rtept><rtept lat="47.234183669691376" lon="-1.5477487544847772"><ele>5.83</ele></rtept><rtept lat="47.234409501620256" lon="-1.547619937683691"><ele>8.49</ele></rtept><rtept lat="47.234948580398594" lon="-1.5477702239516211"><ele>8.66</ele></rtept><rtept lat="47.23521083295654" lon="-1.5481137354211507"><ele>7.27</ele></rtept><rtept lat="47.23559692463824" lon="-1.548242552222237"><ele>7.26</ele></rtept><rtept lat="47.23609228343066" lon="-1.5483498995564584"><ele>5.35</ele></rtept><rtept lat="47.23652936087253" lon="-1.5486719415591634"><ele>5.2</ele></rtept><rtept lat="47.23677703648927" lon="-1.5491228003629345"><ele>5.19</ele></rtept><rtept lat="47.23699557283679" lon="-1.5493374950313978"><ele>5.07</ele></rtept><rtept lat="47.237148547743764" lon="-1.5493658305611806"><ele>5.78</ele></rtept><rtept lat="47.23736708255907" lon="-1.5493658305611806"><ele>5.35</ele></rtept><rtept lat="47.2376730297863" lon="-1.5490759927587618"><ele>5.53</ele></rtept><rtept lat="47.23784057156692" lon="-1.5489042370239872"><ele>5.01</ele></rtept><rtept lat="47.237978975246975" lon="-1.5489740127912315"><ele>4.09</ele></rtept><rtept lat="47.23888951676074" lon="-1.5481098667506867"><ele>4.23</ele></rtept><rtept lat="47.238998780690885" lon="-1.5482064793514863"><ele>4.09</ele></rtept><rtept lat="47.23966164370378" lon="-1.5476321711133405"><ele>4.09</ele></rtept><rtept lat="47.23975269566766" lon="-1.5474765174787188"><ele>4.09</ele></rtept><rtept lat="47.24020431109555" lon="-1.54703639340837"><ele>4.09</ele></rtept><rtept lat="47.24022616335733" lon="-1.5468002292730623"><ele>4.9</ele></rtept><rtept lat="47.24038641300163" lon="-1.546596269338021"><ele>5.16</ele></rtept><rtept lat="47.24063407058944" lon="-1.546478187270357"><ele>5.33</ele></rtept><rtept lat="47.24102740673183" lon="-1.546381574669558"><ele>5.32</ele></rtept><rtept lat="47.24142802387509" lon="-1.5461561452676722"><ele>5.45</ele></rtept><rtept lat="47.24194517970785" lon="-1.5458663074652537"><ele>4.97</ele></rtept><rtept lat="47.24209085649593" lon="-1.5457374906641677"><ele>5.04</ele></rtept><rtept lat="47.24195974740468" lon="-1.5453617749943518"><ele>5.44</ele></rtept><rtept lat="47.24191604430218" lon="-1.5448787119903142"><ele>5.35</ele></rtept><rtept lat="47.241919686228734" lon="-1.5445996089213179"><ele>5.99</ele></rtept><rtept lat="47.242087214581105" lon="-1.544427853186543"><ele>6.75</ele></rtept><rtept lat="47.24220375573113" lon="-1.544299036385477"><ele>6.25</ele></rtept><rtept lat="47.24232393852363" lon="-1.5438589123151283"><ele>6.13</ele></rtept><rtept lat="47.242382208870325" lon="-1.5435690745127097"><ele>5.92</ele></rtept><rtept lat="47.24252060068689" lon="-1.5433007061771153"><ele>6</ele></rtept><rtept lat="47.24270997837632" lon="-1.5431826241094717"><ele>5.88</ele></rtept><rtept lat="47.24289571352954" lon="-1.5431128483422276"><ele>6.38</ele></rtept><rtept lat="47.24331816753158" lon="-1.5436817892136425"><ele>6.99</ele></rtept><rtept lat="47.243777036165056" lon="-1.544229260618213"><ele>6.7</ele></rtept><rtept lat="47.243980976504155" lon="-1.5442077911513687"><ele>7.21</ele></rtept><rtept lat="47.24434879548787" lon="-1.5439233207156613"><ele>7.3</ele></rtept><rtept lat="47.24464741892296" lon="-1.5437945039145953"><ele>7.68</ele></rtept><rtept lat="47.2457872709489" lon="-1.5431718893760493"><ele>7.99</ele></rtept><rtept lat="47.245991203548975" lon="-1.543783769181173"><ele>6.74</ele></rtept><rtept lat="47.24612958593761" lon="-1.5440628722501695"><ele>6.25</ele></rtept><rtept lat="47.24635536695347" lon="-1.5439769943827721"><ele>6.12</ele></rtept><rtept lat="47.24656658058094" lon="-1.5437193607806199"><ele>8.02</ele></rtept><rtept lat="47.24677051018078" lon="-1.543375849311091"><ele>7.71</ele></rtept><rtept lat="47.24693802319328" lon="-1.543064542041808"><ele>6.27</ele></rtept><rtept lat="47.24695258951716" lon="-1.5428498473733445"><ele>5.5</ele></rtept><rtept lat="47.246843341990434" lon="-1.5426351527049011"><ele>5.73</ele></rtept><rtept lat="47.246843341990434" lon="-1.5423667843693072"><ele>6.13</ele></rtept><rtept lat="47.246919815282794" lon="-1.5422111307346855"><ele>5.76</ele></rtept><rtept lat="47.247027241864174" lon="-1.5421440622402474"><ele>5.55</ele></rtept><rtept lat="47.24726758529114" lon="-1.5419669391387614"><ele>5.69</ele></rtept><rtept lat="47.247606249178126" lon="-1.541776397620498"><ele>5.23</ele></rtept><rtept lat="47.24779560868725" lon="-1.541373845117127"><ele>5.33</ele></rtept><rtept lat="47.24797040147941" lon="-1.541067905214575"><ele>5.41</ele></rtept><rtept lat="47.248090571189444" lon="-1.540890782113089"><ele>5.45</ele></rtept><rtept lat="47.24820163689111" lon="-1.5407807510955118"><ele>5.48</ele></rtept><rtept lat="47.2481979953964" lon="-1.5405499543269154"><ele>6.33</ele></rtept><rtept lat="47.248183429414986" lon="-1.5403459943918743"><ele>7.2</ele></rtept><rtept lat="47.24826718375332" lon="-1.5402440144243439"><ele>7.65</ele></rtept><rtept lat="47.24837642834339" lon="-1.5401151976232779"><ele>8.54</ele></rtept><rtept lat="47.24851480450069" lon="-1.540013217655747"><ele>8.63</ele></rtept><rtept lat="47.24867867053525" lon="-1.53992733978837"><ele>8.42</ele></rtept><rtept lat="47.24869323638044" lon="-1.5397582677369506"><ele>8.79</ele></rtept><rtept lat="47.248726009517505" lon="-1.5395195079957926"><ele>8.23</ele></rtept><rtept lat="47.248740575349686" lon="-1.5393262827941736"><ele>8.87</ele></rtept><rtept lat="47.248806121544945" lon="-1.5392511396602184"><ele>8.14</ele></rtept><rtept lat="47.24899547676449" lon="-1.5392681794411647"><ele>5.41</ele></rtept><rtept lat="47.249232169836965" lon="-1.5394184657090753"><ele>5.5</ele></rtept><rtept lat="47.24936690234428" lon="-1.5395687519770054"><ele>6.63</ele></rtept><rtept lat="47.249474323962616" lon="-1.5397458750784914"><ele>6.14</ele></rtept><rtept lat="47.249594490260584" lon="-1.539804916112313"><ele>5.51</ele></rtept><rtept lat="47.24971465628591" lon="-1.5398102834790244"><ele>5.32</ele></rtept><rtept lat="47.24982025650735" lon="-1.5396438951109606"><ele>5.64</ele></rtept><rtept lat="47.24992949789414" lon="-1.5393433225751199"><ele>6.26</ele></rtept><rtept lat="47.250046021791725" lon="-1.5391876689404784"><ele>7.35</ele></rtept><rtept lat="47.250158904073054" lon="-1.5390856889729678"><ele>5.63</ele></rtept><rtept lat="47.25030819962399" lon="-1.5389407700717483"><ele>6.12</ele></rtept><rtept lat="47.25016254543296" lon="-1.5383074207997807"><ele>7.46</ele></rtept><rtept lat="47.2503609991693" lon="-1.538218859249048"><ele>5.76</ele></rtept><rtept lat="47.25050665281458" lon="-1.5383315739499805"><ele>5.88</ele></rtept><rtept lat="47.250645023406534" lon="-1.538573105451999"><ele>5.37</ele></rtept><rtept lat="47.25072149121014" lon="-1.538696554886374"><ele>5.38</ele></rtept><rtept lat="47.250845295991475" lon="-1.5387690143369737"><ele>5.81</ele></rtept><rtept lat="47.250976383091555" lon="-1.5388280553708156"><ele>6.67</ele></rtept><rtept lat="47.25109290468588" lon="-1.5389246679716155"><ele>6.69</ele></rtept><rtept lat="47.25126222467073" lon="-1.5389219842882598"><ele>6.6</ele></rtept><rtept lat="47.25142972347799" lon="-1.538814636954038"><ele>6.62</ele></rtept><rtept lat="47.25163545498368" lon="-1.5387126569865077"><ele>6.64</ele></rtept><rtept lat="47.25185393004397" lon="-1.538664350686108"><ele>6</ele></rtept><rtept lat="47.25217435850211" lon="-1.5385892075521526"><ele>6.21</ele></rtept><rtept lat="47.25231090413097" lon="-1.5385140644181774"><ele>6.32</ele></rtept><rtept lat="47.252511170416426" lon="-1.5383208392165582"><ele>6.74</ele></rtept><rtept lat="47.25268776823983" lon="-1.5381973897822034"><ele>7</ele></rtept><rtept lat="47.25292262422664" lon="-1.538135665065026"><ele>6.07</ele></rtept><rtept lat="47.25317204378541" lon="-1.5380846750812507"><ele>5.44</ele></rtept><rtept lat="47.25360898032695" lon="-1.5381437161150926"><ele>5.26</ele></rtept><rtept lat="47.25385111444129" lon="-1.5382161755656922"><ele>5.21</ele></rtept><rtept lat="47.25440820075614" lon="-1.5382161755656922"><ele>5.45</ele></rtept><rtept lat="47.25462666437794" lon="-1.5383127881664915"><ele>6.63</ele></rtept><rtept lat="47.25500351200727" lon="-1.538323522899914"><ele>6.05</ele></rtept><rtept lat="47.2551600759343" lon="-1.5382752165995142"><ele>6.28</ele></rtept><rtept lat="47.25534030592833" lon="-1.5382913186996474"><ele>7.92</ele></rtept><rtept lat="47.25551143282967" lon="-1.5382644818660922"><ele>8.97</ele></rtept><rtept lat="47.25563886739697" lon="-1.538200073465559"><ele>8.38</ele></rtept><rtept lat="47.25560609853752" lon="-1.5380336850974954"><ele>9.97</ele></rtept><rtept lat="47.255547842737336" lon="-1.5376096631272798"><ele>14.24</ele></rtept><rtept lat="47.25545681792125" lon="-1.5372500495576173"><ele>15.68</ele></rtept><rtept lat="47.25531663939845" lon="-1.5367133128864487"><ele>17.92</ele></rtept><rtept lat="47.25524381924016" lon="-1.5363536993167861"><ele>19.38</ele></rtept><rtept lat="47.25520376811039" lon="-1.5362678214493888"><ele>19.39</ele></rtept><rtept lat="47.25520012709712" lon="-1.5361520574285596"><ele>20</ele></rtept><rtept lat="47.25521287064256" lon="-1.5360048204805254"><ele>19.34</ele></rtept><rtept lat="47.25514733237614" lon="-1.5355969006104433"><ele>20.72</ele></rtept><rtept lat="47.25507633249603" lon="-1.53471396878641"><ele>20.72</ele></rtept><rtept lat="47.254974383783726" lon="-1.533817618545579"><ele>22.28</ele></rtept><rtept lat="47.254886999016975" lon="-1.532985676705281"><ele>24.1</ele></rtept><rtept lat="47.25479597306492" lon="-1.532352327433313"><ele>25.24</ele></rtept><rtept lat="47.25479597306492" lon="-1.5319631933467195"><ele>26.07</ele></rtept><rtept lat="47.25478504994015" lon="-1.5315123345429684"><ele>26.71</ele></rtept><rtept lat="47.25476684472721" lon="-1.5310883125727528"><ele>26.65</ele></rtept><rtept lat="47.25475592159644" lon="-1.5308655668542228"><ele>26.46</ele></rtept><rtept lat="47.25475228055235" lon="-1.5307367500531366"><ele>26.31</ele></rtept><rtept lat="47.25469402381286" lon="-1.5306669742858925"><ele>26.2</ele></rtept><rtept lat="47.25468310066708" lon="-1.5305327901180956"><ele>26</ele></rtept><rtept lat="47.254679459617975" lon="-1.5303878712168963"><ele>25.8</ele></rtept><rtept lat="47.25467581856862" lon="-1.5302107481154106"><ele>25.68</ele></rtept><rtept lat="47.25469038276452" lon="-1.5300711965809024"><ele>25.71</ele></rtept><rtept lat="47.25470858800375" lon="-1.5298779713792836"><ele>26.03</ele></rtept><rtept lat="47.2547049469564" lon="-1.5296149704104203"><ele>25.23</ele></rtept><rtept lat="47.2547686652488" lon="-1.5294620004591544"><ele>24.92</ele></rtept><rtept lat="47.25477958837692" lon="-1.5293331836580681"><ele>24.69</ele></rtept><rtept lat="47.2547067674801" lon="-1.5291748463400714"><ele>24.86</ele></rtept><rtept lat="47.25467763909334" lon="-1.5289869885051635"><ele>24.5</ele></rtept><rtept lat="47.25467035699414" lon="-1.5286434770356339"><ele>24.61</ele></rtept><rtept lat="47.25463940806139" lon="-1.528203352965285"><ele>24.47</ele></rtept><rtept lat="47.25460117700185" lon="-1.527623677360428"><ele>25.12</ele></rtept><rtept lat="47.25460481805632" lon="-1.527145981723102"><ele>23.99</ele></rtept><rtept lat="47.25459025383688" lon="-1.5266146124186644"><ele>25.07</ele></rtept><rtept lat="47.25456840750026" lon="-1.526260366215693"><ele>25.34</ele></rtept><rtept lat="47.25445917568184" lon="-1.5255626085431921"><ele>26.68</ele></rtept><rtept lat="47.25440820075614" lon="-1.5246877277692252"><ele>29.45</ele></rtept><rtept lat="47.25434266149388" lon="-1.5244247268003424"><ele>30.65</ele></rtept><rtept lat="47.25426619891869" lon="-1.5241939300317453"><ele>31.6</ele></rtept><rtept lat="47.25408414472389" lon="-1.523963133263149"><ele>30.66</ele></rtept><rtept lat="47.2539530653161" lon="-1.5236679280940195"><ele>30.86</ele></rtept><rtept lat="47.253862037758694" lon="-1.523388825025023"><ele>29.7</ele></rtept><rtept lat="47.2539166543119" lon="-1.5231633956231372"><ele>29.99</ele></rtept><rtept lat="47.25396762971077" lon="-1.5230882524891824"><ele>29.81</ele></rtept><rtept lat="47.25390026935185" lon="-1.5228684251997104"><ele>29.61</ele></rtept><rtept lat="47.25417699244144" lon="-1.5226268936976919"><ele>26.75</ele></rtept><rtept lat="47.25396762971077" lon="-1.5220257486259905"><ele>28.96</ele></rtept><rtept lat="47.25379649782045" lon="-1.5214433893377777"><ele>29.51</ele></rtept><rtept lat="47.25365813546229" lon="-1.5209281221334738"><ele>28.59</ele></rtept><rtept lat="47.25356710739791" lon="-1.5206060801307888"><ele>28.69</ele></rtept><rtept lat="47.25343966784493" lon="-1.5201820581605732"><ele>28.56</ele></rtept><rtept lat="47.253173864361806" lon="-1.5193876878872528"><ele>28.4</ele></rtept><rtept lat="47.25287893016843" lon="-1.5186121033974411"><ele>26.22</ele></rtept><rtept lat="47.25264225339324" lon="-1.5179894888588952"><ele>27.01</ele></rtept><rtept lat="47.252525735207655" lon="-1.517844569957696"><ele>27.18</ele></rtept><rtept lat="47.252425602187124" lon="-1.5176958759779269"><ele>27.45</ele></rtept><rtept lat="47.252449270009066" lon="-1.5174731715409355"><ele>28.61</ele></rtept><rtept lat="47.252414675048755" lon="-1.517219535347867"><ele>29.03</ele></rtept><rtept lat="47.25240375495748" lon="-1.5171033097703248"><ele>29.13</ele></rtept><rtept lat="47.252356419262334" lon="-1.5170174319029472"><ele>29.29</ele></rtept><rtept lat="47.25218164094453" lon="-1.5167222267338178"><ele>29.15</ele></rtept><rtept lat="47.25244016700186" lon="-1.516341143697291"><ele>30.55</ele></rtept><rtept lat="47.25266227993055" lon="-1.5158473459598312"><ele>31.28</ele></rtept><rtept lat="47.25273328304731" lon="-1.5155521407907016"><ele>30.7</ele></rtept><rtept lat="47.25278790076468" lon="-1.515192527221019"><ele>30.12</ele></rtept><rtept lat="47.25279154194383" lon="-1.5149617304524226"><ele>29.49</ele></rtept><rtept lat="47.2526986917972" lon="-1.514722882633759"><ele>28.42</ele></rtept><rtept lat="47.25254576178903" lon="-1.5144384121980516"><ele>27.87</ele></rtept><rtept lat="47.25240921676574" lon="-1.5141727275458128"><ele>28.45</ele></rtept><rtept lat="47.25199047649899" lon="-1.5132280710045822"><ele>24.87</ele></rtept><rtept lat="47.251589939232694" lon="-1.512208271329396"><ele>24.8</ele></rtept><rtept lat="47.25120760537993" lon="-1.5112904516217212"><ele>22.23</ele></rtept><rtept lat="47.25059768613944" lon="-1.5100693756948493"><ele>23.52</ele></rtept><rtept lat="47.25022991054609" lon="-1.5093823527557506"><ele>24.23</ele></rtept><rtept lat="47.2500660493108" lon="-1.5090764128531986"><ele>24.84</ele></rtept><rtept lat="47.24995680820565" lon="-1.5087704729506468"><ele>22.79</ele></rtept><rtept lat="47.24978202196872" lon="-1.508206899445923"><ele>18.76</ele></rtept><rtept lat="47.24974924948506" lon="-1.5080297763444575"><ele>17.72</ele></rtept><rtept lat="47.249385109413545" lon="-1.5072005181875152"><ele>17.28</ele></rtept><rtept lat="47.24931956393483" lon="-1.5072005181875152"><ele>18.25</ele></rtept><rtept lat="47.24899183532436" lon="-1.5065391544091324"><ele>17.32</ele></rtept><rtept lat="47.248720547329405" lon="-1.5060158361547618"><ele>17.34</ele></rtept><rtept lat="47.24847838975751" lon="-1.5055193547339263"><ele>17.4</ele></rtept><rtept lat="47.248238051824586" lon="-1.505081914346933"><ele>17.76</ele></rtept><rtept lat="47.247435096731685" lon="-1.5041372578057024"><ele>14.51</ele></rtept><rtept lat="47.24735134107764" lon="-1.5040513799383248"><ele>14.29</ele></rtept><rtept lat="47.24733677486341" lon="-1.5038796242035501"><ele>14.01</ele></rtept><rtept lat="47.24726758529114" lon="-1.5037400726690622"><ele>13.96</ele></rtept></rte></gpx>';

describe('Parser object', function() {
    let parser = new gpxParser();

    it('should have basic properties', function() {
        assert.notEqual(parser.xmlSource, undefined);
        assert.notEqual(parser.metadata, undefined);
        assert.notEqual(parser.waypoints, undefined);
        assert.notEqual(parser.tracks, undefined);
        assert.notEqual(parser.routes, undefined);
    });
});


describe('GPX parser', function() {
    let parser = new gpxParser();
    parser.parse(gpxDemo);
    
    it('should parse metadata', function() {

        let parsedMetadata = parser.metadata;

        assert.equal('GPX DEMO', parsedMetadata.name);
        assert.equal('A full featured gpx demo file', parsedMetadata.desc);
        assert.equal('2020-01-12T21:32:52', parsedMetadata.time);
        assert.equal('Demo Author', parsedMetadata.author.name);
        assert.equal('demo', parsedMetadata.author.email.id);
        assert.equal('example.com', parsedMetadata.author.email.domain);
        assert.equal('http://example.com', parsedMetadata.author.link.href);
        assert.equal('Web', parsedMetadata.author.link.type);
        assert.equal('http://example.com', parsedMetadata.link.href);
        assert.equal('Author website', parsedMetadata.link.text);
        assert.equal('Web', parsedMetadata.link.type);

    });

    it('should parse waypoints', function(){
        let parsedWaypoints = parser.waypoints;

        assert.equal(2, parsedWaypoints.length);

        let wpt0 = parsedWaypoints[0];
        assert.equal('Porte de Carquefou', wpt0.name);
        assert.equal(47.253146555709, wpt0.lat);
        assert.equal(-1.5153741828293, wpt0.lon);
        assert.equal(35, wpt0.ele);
        assert.equal('Warning', wpt0.cmt);
        assert.equal('Route', wpt0.desc);
          
    
        let wpt1 = parsedWaypoints[1];
        assert.equal('Pont de la Tortière', wpt1.name);
        assert.equal(47.235331031612, wpt1.lat);
        assert.equal(-1.5482325613225, wpt1.lon);
        assert.equal(20, wpt1.ele);
        assert.equal('Bridge', wpt1.cmt);
        assert.equal('Route', wpt1.desc);
    });

    it('should parse tracks', function(){
        let parsedTracks = parser.tracks;

        assert.equal(1, parsedTracks.length);

        let track = parsedTracks[0];

        assert.equal('Track', track.name);
        assert.equal('Bridge', track.cmt);
        assert.equal('Demo track', track.desc);
        assert.equal('GPX Parser', track.src);
        assert.equal('1', track.number);
        assert.equal('MTB', track.type);

        assert.equal('http://example.com', track.link.href);
        assert.equal('Author website', track.link.text);
        assert.equal('Web', track.link.type);

        assert.equal(6955.702190644043, track.distance.total);
        assert.equal(205, track.distance.cumul.length);
        
        assert.equal(31.6, track.elevation.max);
        assert.equal(4.09, track.elevation.min);
        assert.equal(71.03999999999998, track.elevation.pos);
        assert.equal(69.44000000000001, track.elevation.neg);
        assert.equal(14.148731707317081, track.elevation.avg);
          
        assert.equal(205, track.points.length);

        track.points.forEach(function(pt){
            assert.notEqual(pt.lat, undefined);
            assert.notEqual(pt.lon, undefined);
            assert.notEqual(pt.ele, undefined);
            assert(pt.time == null);
        });
    });

    it('should parse routes', function(){
        let parsedRoutes = parser.routes;

        assert.equal(1, parsedRoutes.length);

        let route = parsedRoutes[0];

        assert.equal('Track', route.name);
        assert.equal('Bridge', route.cmt);
        assert.equal('Demo track', route.desc);
        assert.equal('GPX Parser', route.src);
        assert.equal('1', route.number);
        assert.equal('MTB', route.type);

        assert.equal('http://example.com', route.link.href);
        assert.equal('Author website', route.link.text);
        assert.equal('Web', route.link.type);

        assert.equal(6955.702190644043, route.distance.total);
        assert.equal(205, route.distance.cumul.length);
        
        assert.equal(31.6, route.elevation.max);
        assert.equal(4.09, route.elevation.min);
        assert.equal(71.03999999999998, route.elevation.pos);
        assert.equal(69.44000000000001, route.elevation.neg);
        assert.equal(14.148731707317081, route.elevation.avg);
          
        assert.equal(205, route.points.length);

        route.points.forEach(function(pt){
            assert.notEqual(pt.lat, undefined);
            assert.notEqual(pt.lon, undefined);
            assert.notEqual(pt.ele, undefined);
            assert(pt.time == null);
        });
    });

    it('GetElementValue should be null', function(){
        let elemValue = parser.getElementValue(parser.xmlSource, 'inexistant');
        assert.equal(null, elemValue);
    });

    it('should compute slopes', function(){
        let parserSlopesIdx = new gpxParser();    

        parserSlopesIdx.parse(gpxDemo);
        assert.equal(204, parserSlopesIdx.tracks[0].slopes.length);
    });

});


describe('GeoJSON exporter', function() {
    let parser = new gpxParser();
    parser.parse(gpxDemo); 

    let geoJSON = parser.toGeoJSON();
    it('should export correct metadata', function(){
        assert.equal('FeatureCollection', geoJSON.type);
        assert.equal(4, geoJSON.features.length);
        assert.deepEqual(geoJSON.properties, parser.metadata);
    });

    let features = geoJSON.features;

    it('should export correct features', function(){
        let f0 = features[0];
        assert.equal('LineString', f0.geometry.type);
        assert.equal(205, f0.geometry.coordinates.length);

        f0.geometry.coordinates.forEach(function(pt){
            assert.equal(3, pt.length);
        });

        assert.equal('Track', f0.properties.name);
        assert.equal('Bridge', f0.properties.cmt);
        assert.equal('Demo track', f0.properties.desc);
        assert.equal('GPX Parser', f0.properties.src)
        assert.equal('1', f0.properties.number);
        assert.equal('http://example.com', f0.properties.link.href);
        assert.equal('Author website', f0.properties.link.text);
        assert.equal('Web', f0.properties.link.type);
        assert.equal('MTB', f0.properties.type);

        let f1 = features[1];
        assert.equal('LineString', f1.geometry.type);
        assert.equal(205, f1.geometry.coordinates.length);

        f1.geometry.coordinates.forEach(function(pt){
            assert.equal(3, pt.length);
        });

        assert.equal('Track', f1.properties.name);
        assert.equal('Bridge', f1.properties.cmt);
        assert.equal('Demo track', f1.properties.desc);
        assert.equal('GPX Parser', f1.properties.src)
        assert.equal('1', f1.properties.number);
        assert.equal('http://example.com', f1.properties.link.href);
        assert.equal('Author website', f1.properties.link.text);
        assert.equal('Web', f1.properties.link.type);
        assert.equal('MTB', f1.properties.type);

        let f2 = features[2];
        let feature2 = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ -1.5153741828293, 47.253146555709, 35 ]
            },
            properties: {
                name: 'Porte de Carquefou',
                cmt: 'Warning',
                desc: 'Route',
                sym: 'Fishing Hot Spot Facility'
            }
        };
        assert.deepEqual(feature2, f2);

        let f3 = features[3];
        let feature3 = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ -1.5482325613225, 47.235331031612, 20 ]
            },
            properties: {
                name: 'Pont de la Tortière',
                cmt: 'Bridge',
                desc: 'Route',
                sym: null
            }
        };
        assert.deepEqual(feature3, f3);
    });
});