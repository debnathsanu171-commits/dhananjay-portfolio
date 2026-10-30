import {normalize} from '../functions/api/tts.js';
const T=[
['en','I started in 2016 and moved in 2023.','I started in twenty sixteen and moved in twenty twenty three.'],
['en','My expectation is Rs 50,000 per month.','My expectation is fifty thousand rupees per month.'],
['en','Budget Rs 1,20,000.','Budget one lakh twenty thousand rupees.'],
['en','I have 10+ years of experience.','I have more than ten years of experience.'],
['en','Usually 5-7 years.','Usually five to seven years.'],
['en','We use 18mm boards, 8x4 ft sheets.','We use eighteen millimetre boards, eight by four feet sheets.'],
['en','Wastage fell 12.5% in 2 months.','Wastage fell twelve point five percent in two months.'],
['en','The Biesse Rover Gold 1232 CNC.','The Bee-ess-ay Rover Gold twelve thirty two CNC.'],
['en','Call +91 77976 91585.','Call plus nine one, seven seven nine seven six, nine one five eight five.'],
['en','Email debnathofficial07@gmail.com.','Email debnath official zero seven at gmail dot com.'],
['en','Edge-tek: EDGETEQ, Spazio 3D, Optimus OptiSaw 3.2.','Edge-tek, Edge-tek, Spaatsio three D, Optimus Opti Saw three point two.'],
['hi','मेरे पास 10+ साल का अनुभव है।','मेरे पास 10 से ज़्यादा साल का अनुभव है।'],
['hi','5-7 साल','5 से 7 साल'],
['en','The edge bander and edgebander run edge banding.','The edge baander and edge baander run edge baanding.'],
['en','Homag edge banders, MDF, HDF, PVC, ERP.','Homaag edge baanders, M D F, H D F, P V C, E R P.'],
];
let f=0;for(const [l,i,e] of T){const o=normalize(i,l);const ok=o===e;if(!ok)f++;console.log(ok?'PASS':'FAIL',l,JSON.stringify(i),'->',JSON.stringify(o)+(ok?'':'  expected '+JSON.stringify(e)))}
console.log(f?f+' failed':'all passed');process.exit(f?1:0)
