var inexact,quadrant,EXP_LIMIT=9e15,MAX_DIGITS=1e9,NUMERALS="0123456789abcdef",LN10="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",PI="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",DEFAULTS={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-9000000000000000,maxE:9000000000000000,crypto:!1},external=!0,decimalError="[DecimalError] ",invalidArgument="[DecimalError] Invalid argument: ",precisionLimitExceeded="[DecimalError] Precision limit exceeded",cryptoUnavailable="[DecimalError] crypto unavailable",tag="[object Decimal]",mathfloor=Math.floor,mathpow=Math.pow,isBinary=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,isHex=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,isOctal=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,isDecimal=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,BASE=1e7,LOG_BASE=7,MAX_SAFE_INTEGER=9007199254740991,LN10_PRECISION=LN10.length-1,PI_PRECISION=PI.length-1,P={toStringTag:"[object Decimal]"};P.absoluteValue=P.abs=function(){var e=new this.constructor(this);return 0>e.s&&(e.s=1),finalise(e)},P.ceil=function(){return finalise(new this.constructor(this),this.e+1,2)},P.clampedTo=P.clamp=function(e,i){var s,n=this,t=n.constructor;if(e=new t(e),i=new t(i),!e.s||!i.s)return new t(NaN);if(e.gt(i))throw Error(invalidArgument+i);return s=n.cmp(e),0>s?e:0<n.cmp(i)?i:new t(n)},P.comparedTo=P.cmp=function(e){var s,n,t,o,r=this,d=r.d,c=(e=new r.constructor(e)).d,l=r.s,u=e.s;if(!d||!c)return l&&u?l===u?d===c?0:!d^0>l?1:-1:l:NaN;if(!d[0]||!c[0])return d[0]?l:c[0]?-u:0;if(l!==u)return l;if(r.e!==e.e)return r.e>e.e^0>l?1:-1;for(t=d.length,o=c.length,(s=0,n=t<o?t:o);s<n;++s)if(d[s]!==c[s])return d[s]>c[s]^0>l?1:-1;return t===o?0:t>o^0>l?1:-1},P.cosine=P.cos=function(){var e,i,s=this,n=s.constructor;return s.d?s.d[0]?(e=n.precision,i=n.rounding,n.precision=e+Math.max(s.e,s.sd())+LOG_BASE,n.rounding=1,s=cosine(n,toLessThanHalfPi(n,s)),n.precision=e,n.rounding=i,finalise(2==quadrant||3==quadrant?s.neg():s,e,i,!0)):new n(1):new n(NaN)},P.cubeRoot=P.cbrt=function(){var i,o,d,c,l,u,g,p,a,h,f=this,x=f.constructor;if(!f.isFinite()||f.isZero())return new x(f);for(external=!1,u=f.s*mathpow(f.s*f,1/3),u&&Math.abs(u)!=1/0?c=new x(u.toString()):(d=digitsToString(f.d),i=f.e,(u=(i-d.length+1)%3)&&(d+=1==u||-2==u?"0":"00"),u=mathpow(d,1/3),i=mathfloor((i+1)/3)-(i%3==(0>i?-1:2)),u==1/0?d="5e"+i:(d=u.toExponential(),d=d.slice(0,d.indexOf("e")+1)+i),c=new x(d),c.s=f.s),g=(i=x.precision)+3;;)if(p=c,a=p.times(p).times(p),h=a.plus(f),c=divide(h.plus(f).times(p),h.plus(a),g+2,1),digitsToString(p.d).slice(0,g)===(d=digitsToString(c.d)).slice(0,g))if(d=d.slice(g-3,g+1),"9999"==d||!l&&"4999"==d){if(!l&&(finalise(p,i+1,0),p.times(p).times(p).eq(f))){c=p;break}g+=4,l=1}else{+d&&(+d.slice(1)||"5"!=d.charAt(0))||(finalise(c,i+1,1),o=!c.times(c).times(c).eq(f));break}return external=!0,finalise(c,i,x.rounding,o)},P.decimalPlaces=P.dp=function(){var e,i=this.d,s=NaN;if(i){if(e=i.length-1,s=(e-mathfloor(this.e/LOG_BASE))*LOG_BASE,e=i[e],e)for(;0==e%10;e/=10)s--;0>s&&(s=0)}return s},P.dividedBy=P.div=function(e){return divide(this,new this.constructor(e))},P.dividedToIntegerBy=P.divToInt=function(e){var i=this,s=i.constructor;return finalise(divide(i,new s(e),0,1,1),s.precision,s.rounding)},P.equals=P.eq=function(e){return 0===this.cmp(e)},P.floor=function(){return finalise(new this.constructor(this),this.e+1,3)},P.greaterThan=P.gt=function(e){return 0<this.cmp(e)},P.greaterThanOrEqualTo=P.gte=function(e){var i=this.cmp(e);return 1==i||0===i},P.hyperbolicCosine=P.cosh=function(){var e,s,t,o,r,d=this,c=d.constructor,l=new c(1);if(!d.isFinite())return new c(d.s?1/0:NaN);if(d.isZero())return l;t=c.precision,o=c.rounding,c.precision=t+Math.max(d.e,d.sd())+4,c.rounding=1,r=d.d.length,32>r?(e=Math.ceil(r/3),s=(1/tinyPow(4,e)).toString()):(e=16,s="2.3283064365386962890625e-10"),d=taylorSeries(c,1,d.times(s),new c(1),!0);for(var u,g=e,p=new c(8);g--;)u=d.times(d),d=l.minus(u.times(p.minus(u.times(p))));return finalise(d,c.precision=t,c.rounding=o,!0)},P.hyperbolicSine=P.sinh=function(){var e,i,s,n,t=this,o=t.constructor;if(!t.isFinite()||t.isZero())return new o(t);if(i=o.precision,s=o.rounding,o.precision=i+Math.max(t.e,t.sd())+4,o.rounding=1,n=t.d.length,3>n)t=taylorSeries(o,2,t,t,!0);else{e=1.4*Math.sqrt(n),e=16<e?16:0|e,t=t.times(1/tinyPow(5,e)),t=taylorSeries(o,2,t,t,!0);for(var r,d=new o(5),c=new o(16),l=new o(20);e--;)r=t.times(t),t=t.times(d.plus(r.times(c.times(r).plus(l))))}return o.precision=i,o.rounding=s,finalise(t,i,s,!0)},P.hyperbolicTangent=P.tanh=function(){var e,i,s=this,n=s.constructor;return s.isFinite()?s.isZero()?new n(s):(e=n.precision,i=n.rounding,n.precision=e+7,n.rounding=1,divide(s.sinh(),s.cosh(),n.precision=e,n.rounding=i)):new n(s.s)},P.inverseCosine=P.acos=function(){var e,i=this,s=i.constructor,n=i.abs().cmp(1),t=s.precision,o=s.rounding;return-1===n?i.isZero()?getPi(s,t+4,o).times(.5):(s.precision=t+6,s.rounding=1,i=i.asin(),e=getPi(s,t+4,o).times(.5),s.precision=t,s.rounding=o,e.minus(i)):0===n?i.isNeg()?getPi(s,t,o):new s(0):new s(NaN)},P.inverseHyperbolicCosine=P.acosh=function(){var e,i,s=this,n=s.constructor;return s.lte(1)?new n(s.eq(1)?0:NaN):s.isFinite()?(e=n.precision,i=n.rounding,n.precision=e+Math.max(Math.abs(s.e),s.sd())+4,n.rounding=1,external=!1,s=s.times(s).minus(1).sqrt().plus(s),external=!0,n.precision=e,n.rounding=i,s.ln()):new n(s)},P.inverseHyperbolicSine=P.asinh=function(){var e,i,s=this,n=s.constructor;return!s.isFinite()||s.isZero()?new n(s):(e=n.precision,i=n.rounding,n.precision=e+2*Math.max(Math.abs(s.e),s.sd())+6,n.rounding=1,external=!1,s=s.times(s).plus(1).sqrt().plus(s),external=!0,n.precision=e,n.rounding=i,s.ln())},P.inverseHyperbolicTangent=P.atanh=function(){var e,i,s,n,t=this,o=t.constructor;return t.isFinite()?0<=t.e?new o(t.abs().eq(1)?t.s/0:t.isZero()?t:NaN):(e=o.precision,i=o.rounding,n=t.sd(),Math.max(n,e)<2*-t.e-1)?finalise(new o(t),e,i,!0):(o.precision=s=n-t.e,t=divide(t.plus(1),new o(1).minus(t),s+e,1),o.precision=e+4,o.rounding=1,t=t.ln(),o.precision=e,o.rounding=i,t.times(.5)):new o(NaN)},P.inverseSine=P.asin=function(){var e,i,s,n,t=this,o=t.constructor;return t.isZero()?new o(t):(i=t.abs().cmp(1),s=o.precision,n=o.rounding,-1!==i)?0===i?(e=getPi(o,s+4,n).times(.5),e.s=t.s,e):new o(NaN):(o.precision=s+6,o.rounding=1,t=t.div(new o(1).minus(t.times(t)).sqrt().plus(1)).atan(),o.precision=s,o.rounding=n,t.times(2))},P.inverseTangent=P.atan=function(){var e,s,o,d,c,l,u,g,p,a=this,m=a.constructor,h=m.precision,f=m.rounding;if(!a.isFinite()){if(!a.s)return new m(NaN);if(h+4<=PI_PRECISION)return u=getPi(m,h+4,f).times(.5),u.s=a.s,u}else{if(a.isZero())return new m(a);if(a.abs().eq(1)&&h+4<=PI_PRECISION)return u=getPi(m,h+4,f).times(.25),u.s=a.s,u}for(m.precision=g=h+10,m.rounding=1,o=Math.min(28,0|g/LOG_BASE+2),e=o;e;--e)a=a.div(a.times(a).plus(1).sqrt().plus(1));for(external=!1,s=Math.ceil(g/LOG_BASE),d=1,p=a.times(a),u=new m(a),c=a;-1!==e;)if(c=c.times(p),l=u.minus(c.div(d+=2)),c=c.times(p),u=l.plus(c.div(d+=2)),void 0!==u.d[s])for(e=s;u.d[e]===l.d[e]&&e--;);return o&&(u=u.times(2<<o-1)),external=!0,finalise(u,m.precision=h,m.rounding=f,!0)},P.isFinite=function(){return!!this.d},P.isInteger=P.isInt=function(){return!!this.d&&mathfloor(this.e/LOG_BASE)>this.d.length-2},P.isNaN=function(){return!this.s},P.isNegative=P.isNeg=function(){return 0>this.s},P.isPositive=P.isPos=function(){return 0<this.s},P.isZero=function(){return!!this.d&&0===this.d[0]},P.lessThan=P.lt=function(e){return 0>this.cmp(e)},P.lessThanOrEqualTo=P.lte=function(e){return 1>this.cmp(e)},P.logarithm=P.log=function(e){var i,s,n,t,o,c,l,u,g=this,p=g.constructor,a=p.precision,m=p.rounding;if(null==e)e=new p(10),i=!0;else{if(e=new p(e),s=e.d,0>e.s||!s||!s[0]||e.eq(1))return new p(NaN);i=e.eq(10)}if(s=g.d,0>g.s||!s||!s[0]||g.eq(1))return new p(s&&!s[0]?-1/0:1==g.s?s?0:1/0:NaN);if(i)if(1<s.length)o=!0;else{for(t=s[0];0==t%10;)t/=10;o=1!==t}if(external=!1,l=a+5,c=naturalLogarithm(g,l),n=i?getLn10(p,l+10):naturalLogarithm(e,l),u=divide(c,n,l,1),checkRoundingDigits(u.d,t=a,m))do if(l+=10,c=naturalLogarithm(g,l),n=i?getLn10(p,l+10):naturalLogarithm(e,l),u=divide(c,n,l,1),!o){1e14==+digitsToString(u.d).slice(t+1,t+15)+1&&(u=finalise(u,a+1,0));break}while(checkRoundingDigits(u.d,t+=10,m));return external=!0,finalise(u,a,m)},P.minus=P.sub=function(s){var n,t,o,r,c,l,u,g,p,a,m,h,f=this,x=f.constructor;if(s=new x(s),!f.d||!s.d)return f.s&&s.s?f.d?s.s=-s.s:s=new x(s.d||f.s!==s.s?f:NaN):s=new x(NaN),s;if(f.s!=s.s)return s.s=-s.s,f.plus(s);if(p=f.d,h=s.d,u=x.precision,g=x.rounding,!p[0]||!h[0]){if(h[0])s.s=-s.s;else if(p[0])s=new x(f);else return new x(3===g?-0:0);return external?finalise(s,u,g):s}if(t=mathfloor(s.e/LOG_BASE),a=mathfloor(f.e/LOG_BASE),p=p.slice(),c=a-t,c){for(m=0>c,m?(n=p,c=-c,l=h.length):(n=h,t=a,l=p.length),o=Math.max(Math.ceil(u/LOG_BASE),l)+2,c>o&&(c=o,n.length=1),n.reverse(),o=c;o--;)n.push(0);n.reverse()}else{for(o=p.length,l=h.length,m=o<l,m&&(l=o),o=0;o<l;o++)if(p[o]!=h[o]){m=p[o]<h[o];break}c=0}for(m&&(n=p,p=h,h=n,s.s=-s.s),l=p.length,o=h.length-l;0<o;--o)p[l++]=0;for(o=h.length;o>c;){if(p[--o]<h[o]){for(r=o;r&&0===p[--r];)p[r]=9999999;--p[r],p[o]+=BASE}p[o]-=h[o]}for(;0===p[--l];)p.pop();for(;0===p[0];p.shift())--t;return p[0]?(s.d=p,s.e=getBase10Exponent(p,t),external?finalise(s,u,g):s):new x(3===g?-0:0)},P.modulo=P.mod=function(e){var i,s=this,n=s.constructor;return(e=new n(e),!s.d||!e.s||e.d&&!e.d[0])?new n(NaN):e.d&&(!s.d||s.d[0])?(external=!1,9==n.modulo?(i=divide(s,e.abs(),0,3,1),i.s*=e.s):i=divide(s,e,0,n.modulo,1),i=i.times(e),external=!0,s.minus(i)):finalise(new n(s),n.precision,n.rounding)},P.naturalExponential=P.exp=function(){return naturalExponential(this)},P.naturalLogarithm=P.ln=function(){return naturalLogarithm(this)},P.negated=P.neg=function(){var e=new this.constructor(this);return e.s=-e.s,finalise(e)},P.plus=P.add=function(s){var n,t,o,r,c,l,u,g,p,a,m=this,h=m.constructor;if(s=new h(s),!m.d||!s.d)return m.s&&s.s?!m.d&&(s=new h(s.d||m.s===s.s?m:NaN)):s=new h(NaN),s;if(m.s!=s.s)return s.s=-s.s,m.minus(s);if(p=m.d,a=s.d,u=h.precision,g=h.rounding,!p[0]||!a[0])return a[0]||(s=new h(m)),external?finalise(s,u,g):s;if(c=mathfloor(m.e/LOG_BASE),o=mathfloor(s.e/LOG_BASE),p=p.slice(),r=c-o,r){for(0>r?(t=p,r=-r,l=a.length):(t=a,o=c,l=p.length),c=Math.ceil(u/LOG_BASE),l=c>l?c+1:l+1,r>l&&(r=l,t.length=1),t.reverse();r--;)t.push(0);t.reverse()}for(l=p.length,r=a.length,0>l-r&&(r=l,t=a,a=p,p=t),n=0;r;)n=0|(p[--r]=p[r]+a[r]+n)/BASE,p[r]%=BASE;for(n&&(p.unshift(n),++o),l=p.length;0==p[--l];)p.pop();return s.d=p,s.e=getBase10Exponent(p,o),external?finalise(s,u,g):s},P.precision=P.sd=function(e){var i,s=this;if(void 0!==e&&e!==!!e&&1!==e&&0!==e)throw Error(invalidArgument+e);return s.d?(i=getPrecision(s.d),e&&s.e+1>i&&(i=s.e+1)):i=NaN,i},P.round=function(){var e=this,i=e.constructor;return finalise(new i(e),e.e+1,i.rounding)},P.sine=P.sin=function(){var e,i,s=this,n=s.constructor;return s.isFinite()?s.isZero()?new n(s):(e=n.precision,i=n.rounding,n.precision=e+Math.max(s.e,s.sd())+LOG_BASE,n.rounding=1,s=sine(n,toLessThanHalfPi(n,s)),n.precision=e,n.rounding=i,finalise(2<quadrant?s.neg():s,e,i,!0)):new n(NaN)},P.squareRoot=P.sqrt=function(){var i,o,c,l,u,g,p=this,a=p.d,d=p.e,h=p.s,x=p.constructor;if(1!==h||!a||!a[0])return new x(!h||0>h&&(!a||a[0])?NaN:a?p:1/0);for(external=!1,h=Math.sqrt(+p),0==h||h==1/0?(o=digitsToString(a),0==(o.length+d)%2&&(o+="0"),h=Math.sqrt(o),d=mathfloor((d+1)/2)-(0>d||d%2),h==1/0?o="5e"+d:(o=h.toExponential(),o=o.slice(0,o.indexOf("e")+1)+d),l=new x(o)):l=new x(h.toString()),c=(d=x.precision)+3;;)if(g=l,l=g.plus(divide(p,g,c+2,1)).times(.5),digitsToString(g.d).slice(0,c)===(o=digitsToString(l.d)).slice(0,c))if(o=o.slice(c-3,c+1),"9999"==o||!u&&"4999"==o){if(!u&&(finalise(g,d+1,0),g.times(g).eq(p))){l=g;break}c+=4,u=1}else{+o&&(+o.slice(1)||"5"!=o.charAt(0))||(finalise(l,d+1,1),i=!l.times(l).eq(p));break}return external=!0,finalise(l,d,x.rounding,i)},P.tangent=P.tan=function(){var e,i,s=this,n=s.constructor;return s.isFinite()?s.isZero()?new n(s):(e=n.precision,i=n.rounding,n.precision=e+10,n.rounding=1,s=s.sin(),s.s=1,s=divide(s,new n(1).minus(s.times(s)).sqrt(),e+10,0),n.precision=e,n.rounding=i,finalise(2==quadrant||4==quadrant?s.neg():s,e,i,!0)):new n(NaN)},P.times=P.mul=function(s){var n,o,d,c,l,u,g,p,a,m=this,h=m.constructor,x=m.d,f=(s=new h(s)).d;if(s.s*=m.s,!x||!x[0]||!f||!f[0])return new h(s.s&&(!x||x[0]||f)&&(!f||f[0]||x)?x&&f?0*s.s:s.s/0:NaN);for(o=mathfloor(m.e/LOG_BASE)+mathfloor(s.e/LOG_BASE),p=x.length,a=f.length,p<a&&(l=x,x=f,f=l,u=p,p=a,a=u),l=[],u=p+a,d=u;d--;)l.push(0);for(d=a;0<=--d;){for(n=0,c=p+d;c>d;)g=l[c]+f[d]*x[c-d-1]+n,l[c--]=0|g%BASE,n=0|g/BASE;l[c]=0|(l[c]+n)%BASE}for(;!l[--u];)l.pop();return n?++o:l.shift(),s.d=l,s.e=getBase10Exponent(l,o),external?finalise(s,h.precision,h.rounding):s},P.toBinary=function(e,i){return toStringBinary(this,2,e,i)},P.toDecimalPlaces=P.toDP=function(e,i){var s=this,n=s.constructor;return(s=new n(s),void 0===e)?s:(checkInt32(e,0,MAX_DIGITS),void 0===i?i=n.rounding:checkInt32(i,0,8),finalise(s,e+s.e+1,i))},P.toExponential=function(e,i){var s,n=this,t=n.constructor;return void 0===e?s=finiteToString(n,!0):(checkInt32(e,0,MAX_DIGITS),void 0===i?i=t.rounding:checkInt32(i,0,8),n=finalise(new t(n),e+1,i),s=finiteToString(n,!0,e+1)),n.isNeg()&&!n.isZero()?"-"+s:s},P.toFixed=function(e,i){var s,n,t=this,o=t.constructor;return void 0===e?s=finiteToString(t):(checkInt32(e,0,MAX_DIGITS),void 0===i?i=o.rounding:checkInt32(i,0,8),n=finalise(new o(t),e+t.e+1,i),s=finiteToString(n,!1,e+n.e+1)),t.isNeg()&&!t.isZero()?"-"+s:s},P.toFraction=function(i){var s,t,o,c,l,u,g,p,a,m,h,f,E=this,x=E.d,b=E.constructor;if(!x)return new b(E);if(a=t=new b(1),o=p=new b(0),s=new b(o),l=s.e=getPrecision(x)-E.e-1,u=l%LOG_BASE,s.d[0]=mathpow(10,0>u?LOG_BASE+u:u),null==i)i=0<l?s:a;else{if(g=new b(i),!g.isInt()||g.lt(a))throw Error(invalidArgument+g);i=g.gt(s)?0<l?s:a:g}for(external=!1,g=new b(digitsToString(x)),m=b.precision,b.precision=l=2*(x.length*LOG_BASE);;){if(h=divide(g,s,0,1,1),c=t.plus(h.times(o)),1==c.cmp(i))break;t=o,o=c,c=a,a=p.plus(h.times(c)),p=c,c=s,s=g.minus(h.times(c)),g=c}return c=divide(i.minus(t),o,0,1,1),p=p.plus(c.times(a)),t=t.plus(c.times(o)),p.s=a.s=E.s,f=1>divide(a,o,l,1).minus(E).abs().cmp(divide(p,t,l,1).minus(E).abs())?[a,o]:[p,t],b.precision=m,external=!0,f},P.toHexadecimal=P.toHex=function(e,i){return toStringBinary(this,16,e,i)},P.toNearest=function(e,i){var s=this,n=s.constructor;if(s=new n(s),null==e){if(!s.d)return s;e=new n(1),i=n.rounding}else{if(e=new n(e),void 0===i?i=n.rounding:checkInt32(i,0,8),!s.d)return e.s?s:e;if(!e.d)return e.s&&(e.s=s.s),e}return e.d[0]?(external=!1,s=divide(s,e,0,i,1).times(e),external=!0,finalise(s)):(e.s=s.s,s=e),s},P.toNumber=function(){return+this},P.toOctal=function(e,i){return toStringBinary(this,8,e,i)},P.toPower=P.pow=function(i){var n,t,o,d,c,l,u=this,g=u.constructor,p=+(i=new g(i));if(!u.d||!i.d||!u.d[0]||!i.d[0])return new g(mathpow(+u,p));if(u=new g(u),u.eq(1))return u;if(o=g.precision,c=g.rounding,i.eq(1))return finalise(u,o,c);if(n=mathfloor(i.e/LOG_BASE),n>=i.d.length-1&&(t=0>p?-p:p)<=MAX_SAFE_INTEGER)return d=intPow(g,u,t,o),0>i.s?new g(1).div(d):finalise(d,o,c);if(l=u.s,0>l){if(n<i.d.length-1)return new g(NaN);if(0==(1&i.d[n])&&(l=1),0==u.e&&1==u.d[0]&&1==u.d.length)return u.s=l,u}return(t=mathpow(+u,p),n=0!=t&&isFinite(t)?new g(t+"").e:mathfloor(p*(Math.log("0."+digitsToString(u.d))/Math.LN10+u.e+1)),n>g.maxE+1||n<g.minE-1)?new g(0<n?l/0:0):(external=!1,g.rounding=u.s=1,t=Math.min(12,(n+"").length),d=naturalExponential(i.times(naturalLogarithm(u,o+t)),o),d.d&&(d=finalise(d,o+5,1),checkRoundingDigits(d.d,o,c)&&(n=o+10,d=finalise(naturalExponential(i.times(naturalLogarithm(u,n+t)),n),n+5,1),1e14==+digitsToString(d.d).slice(o+1,o+15)+1&&(d=finalise(d,o+1,0)))),d.s=l,external=!0,g.rounding=c,finalise(d,o,c))},P.toPrecision=function(e,i){var s,n=this,t=n.constructor;return void 0===e?s=finiteToString(n,n.e<=t.toExpNeg||n.e>=t.toExpPos):(checkInt32(e,1,MAX_DIGITS),void 0===i?i=t.rounding:checkInt32(i,0,8),n=finalise(new t(n),e,i),s=finiteToString(n,e<=n.e||n.e<=t.toExpNeg,e)),n.isNeg()&&!n.isZero()?"-"+s:s},P.toSignificantDigits=P.toSD=function(e,i){var s=this,n=s.constructor;return void 0===e?(e=n.precision,i=n.rounding):(checkInt32(e,1,MAX_DIGITS),void 0===i?i=n.rounding:checkInt32(i,0,8)),finalise(new n(s),e,i)},P.toString=function(){var e=this,i=e.constructor,s=finiteToString(e,e.e<=i.toExpNeg||e.e>=i.toExpPos);return e.isNeg()&&!e.isZero()?"-"+s:s},P.truncated=P.trunc=function(){return finalise(new this.constructor(this),this.e+1,1)},P.valueOf=P.toJSON=function(){var e=this,i=e.constructor,s=finiteToString(e,e.e<=i.toExpNeg||e.e>=i.toExpPos);return e.isNeg()?"-"+s:s};function digitsToString(e){var s,n,t,o=e.length-1,r="",d=e[0];if(0<o){for(r+=d,s=1;s<o;s++)t=e[s]+"",n=LOG_BASE-t.length,n&&(r+=getZeroString(n)),r+=t;d=e[s],t=d+"",n=LOG_BASE-t.length,n&&(r+=getZeroString(n))}else if(0===d)return"0";for(;0==d%10;)d/=10;return r+d}function checkInt32(e,i,s){if(e!==~~e||e<i||e>s)throw Error(invalidArgument+e)}function checkRoundingDigits(e,s,n,t){var o,d,c,l;for(d=e[0];10<=d;d/=10)--s;return 0>--s?(s+=LOG_BASE,o=0):(o=Math.ceil((s+1)/LOG_BASE),s%=LOG_BASE),d=mathpow(10,LOG_BASE-s),l=0|e[o]%d,null==t?3>s?(0==s?l=0|l/100:1==s&&(l=0|l/10),c=4>n&&99999==l||3<n&&49999==l||5e4==l||0==l):c=(4>n&&l+1==d||3<n&&l+1==d/2)&&(0|e[o+1]/d/100)==mathpow(10,s-2)-1||(l==d/2||0==l)&&0==(0|e[o+1]/d/100):4>s?(0==s?l=0|l/1e3:1==s?l=0|l/100:2==s&&(l=0|l/10),c=(t||4>n)&&9999==l||!t&&3<n&&4999==l):c=((t||4>n)&&l+1==d||!t&&3<n&&l+1==d/2)&&(0|e[o+1]/d/1e3)==mathpow(10,s-3)-1,c}function convertBase(e,s,n){for(var t,o,r=[0],d=0,c=e.length;d<c;){for(o=r.length;o--;)r[o]*=s;for(r[0]+=NUMERALS.indexOf(e.charAt(d++)),t=0;t<r.length;t++)r[t]>n-1&&(void 0===r[t+1]&&(r[t+1]=0),r[t+1]+=0|r[t]/n,r[t]%=n)}return r.reverse()}function cosine(e,s){var n,t,o;if(s.isZero())return s;t=s.d.length,32>t?(n=Math.ceil(t/3),o=(1/tinyPow(4,n)).toString()):(n=16,o="2.3283064365386962890625e-10"),e.precision+=n,s=taylorSeries(e,1,s.times(o),new e(1));for(var r,d=n;d--;)r=s.times(s),s=r.times(r).minus(r).times(8).plus(1);return e.precision-=n,s}var divide=function(){function e(e,s,n){var t,o=0,r=e.length;for(e=e.slice();r--;)t=e[r]*s+o,e[r]=0|t%n,o=0|t/n;return o&&e.unshift(o),e}function s(e,s,n,t){var o,d;if(n!=t)d=n>t?1:-1;else for(o=d=0;o<n;o++)if(e[o]!=s[o]){d=e[o]>s[o]?1:-1;break}return d}function n(e,s,n,t){for(var o=0;n--;)e[n]-=o,o=e[n]<s[n]?1:0,e[n]=o*t+e[n]-s[n];for(;!e[0]&&1<e.length;)e.shift()}return function(o,r,d,c,l,u){var g,p,a,m,h,x,f,E,b,N,O,v,D,y,F,L,Z,A,P,R,T=o.constructor,S=o.s==r.s?1:-1,_=o.d,j=r.d;if(!_||!_[0]||!j||!j[0])return new T(o.s&&r.s&&(_?!(j&&_[0]==j[0]):!!j)?_&&0==_[0]||!j?0*S:S/0:NaN);for(u?(h=1,p=o.e-r.e):(u=BASE,h=LOG_BASE,p=mathfloor(o.e/h)-mathfloor(r.e/h)),P=j.length,Z=_.length,b=new T(S),N=b.d=[],a=0;j[a]==(_[a]||0);a++);if(j[a]>(_[a]||0)&&p--,null==d?(y=d=T.precision,c=T.rounding):l?y=d+(o.e-r.e)+1:y=d,0>y)N.push(1),x=!0;else{if(y=0|y/h+2,a=0,1==P){for(m=0,j=j[0],y++;(a<Z||m)&&y--;a++)F=m*u+(_[a]||0),N[a]=0|F/j,m=0|F%j;x=m||a<Z}else{for(m=0|u/(j[0]+1),1<m&&(j=e(j,m,u),_=e(_,m,u),P=j.length,Z=_.length),L=P,O=_.slice(0,P),v=O.length;v<P;)O[v++]=0;R=j.slice(),R.unshift(0),A=j[0],j[1]>=u/2&&++A;do m=0,g=s(j,O,P,v),0>g?(D=O[0],P!=v&&(D=D*u+(O[1]||0)),m=0|D/A,1<m?(m>=u&&(m=u-1),f=e(j,m,u),E=f.length,v=O.length,g=s(f,O,E,v),1==g&&(m--,n(f,P<E?R:j,E,u))):(0==m&&(g=m=1),f=j.slice()),E=f.length,E<v&&f.unshift(0),n(O,f,v,u),-1==g&&(v=O.length,g=s(j,O,P,v),1>g&&(m++,n(O,P<v?R:j,v,u))),v=O.length):0===g&&(m++,O=[0]),N[a++]=m,g&&O[0]?O[v++]=_[L]||0:(O=[_[L]],v=1);while((L++<Z||void 0!==O[0])&&y--);x=void 0!==O[0]}N[0]||N.shift()}if(1==h)b.e=p,inexact=x;else{for(a=1,m=N[0];10<=m;m/=10)a++;b.e=a+p*h-1,finalise(b,l?d+b.e+1:d,c,x)}return b}}();function finalise(e,s,n,t){var o,r,d,c,l,u,g,p,a,m=e.constructor;out:if(null!=s){if(p=e.d,!p)return e;for(o=1,c=p[0];10<=c;c/=10)o++;if(r=s-o,0>r)r+=LOG_BASE,d=s,g=p[a=0],l=0|g/mathpow(10,o-d-1)%10;else if(a=Math.ceil((r+1)/LOG_BASE),c=p.length,!(a>=c)){for(g=c=p[a],o=1;10<=c;c/=10)o++;r%=LOG_BASE,d=r-LOG_BASE+o,l=0>d?0:0|g/mathpow(10,o-d-1)%10}else if(t){for(;c++<=a;)p.push(0);g=l=0,o=1,r%=LOG_BASE,d=r-LOG_BASE+1}else break out;if(t=t||0>s||void 0!==p[a+1]||(0>d?g:g%mathpow(10,o-d-1)),u=4>n?(l||t)&&(0==n||n==(0>e.s?3:2)):5<l||5==l&&(4==n||t||6==n&&1&(0<r?0<d?g/mathpow(10,o-d):0:p[a-1])%10||n==(0>e.s?8:7)),1>s||!p[0])return p.length=0,u?(s-=e.e+1,p[0]=mathpow(10,(LOG_BASE-s%LOG_BASE)%LOG_BASE),e.e=-s||0):p[0]=e.e=0,e;if(0==r?(p.length=a,c=1,a--):(p.length=a+1,c=mathpow(10,LOG_BASE-r),p[a]=0<d?(0|g/mathpow(10,o-d)%mathpow(10,d))*c:0),u)for(;;)if(0==a){for(r=1,d=p[0];10<=d;d/=10)r++;for(d=p[0]+=c,c=1;10<=d;d/=10)c++;r!=c&&(e.e++,p[0]==BASE&&(p[0]=1));break}else{if(p[a]+=c,p[a]!=BASE)break;p[a--]=0,c=1}for(r=p.length;0===p[--r];)p.pop()}return external&&(e.e>m.maxE?(e.d=null,e.e=NaN):e.e<m.minE&&(e.e=0,e.d=[0])),e}function finiteToString(i,s,n){if(!i.isFinite())return nonFiniteToString(i);var t,o=i.e,e=digitsToString(i.d),r=e.length;return s?(n&&0<(t=n-r)?e=e.charAt(0)+"."+e.slice(1)+getZeroString(t):1<r&&(e=e.charAt(0)+"."+e.slice(1)),e=e+(0>i.e?"e":"e+")+i.e):0>o?(e="0."+getZeroString(-o-1)+e,n&&0<(t=n-r)&&(e+=getZeroString(t))):o>=r?(e+=getZeroString(o+1-r),n&&0<(t=n-o-1)&&(e=e+"."+getZeroString(t))):((t=o+1)<r&&(e=e.slice(0,t)+"."+e.slice(t)),n&&0<(t=n-r)&&(o+1===r&&(e+="."),e+=getZeroString(t))),e}function getBase10Exponent(i,s){var n=i[0];for(s*=LOG_BASE;10<=n;n/=10)s++;return s}function getLn10(e,i,s){if(i>LN10_PRECISION)throw external=!0,s&&(e.precision=s),Error(precisionLimitExceeded);return finalise(new e(LN10),i,1,!0)}function getPi(e,i,s){if(i>PI_PRECISION)throw Error(precisionLimitExceeded);return finalise(new e(PI),i,s,!0)}function getPrecision(e){var i=e.length-1,s=i*LOG_BASE+1;if(i=e[i],i){for(;0==i%10;i/=10)s--;for(i=e[0];10<=i;i/=10)s++}return s}function getZeroString(e){for(var i="";e--;)i+="0";return i}function intPow(e,i,s,t){var o,d=new e(1),c=Math.ceil(t/LOG_BASE+4);for(external=!1;;){if(s%2&&(d=d.times(i),truncate(d.d,c)&&(o=!0)),s=mathfloor(s/2),0===s){s=d.d.length-1,o&&0===d.d[s]&&++d.d[s];break}i=i.times(i),truncate(i.d,c)}return external=!0,d}function isOdd(e){return 1&e.d[e.d.length-1]}function maxOrMin(e,s,n){for(var t,o=new e(s[0]),r=0;++r<s.length;)if(t=new e(s[r]),!t.s){o=t;break}else o[n](t)&&(o=t);return o}function naturalExponential(e,s){var n,o,r,d,c,l,u,g=0,p=0,a=0,m=e.constructor,h=m.rounding,f=m.precision;if(!e.d||!e.d[0]||17<e.e)return new m(e.d?e.d[0]?0>e.s?0:1/0:1:e.s?0>e.s?0:e:0/0);for(null==s?(external=!1,u=f):u=s,l=new m(.03125);-2<e.e;)e=e.times(l),a+=5;for(o=0|2*(Math.log(mathpow(2,a))/Math.LN10)+5,u+=o,n=d=c=new m(1),m.precision=u;;){if(d=finalise(d.times(e),u,1),n=n.times(++p),l=c.plus(divide(d,n,u,1)),digitsToString(l.d).slice(0,u)===digitsToString(c.d).slice(0,u)){for(r=a;r--;)c=finalise(c.times(c),u,1);if(null!=s)return m.precision=f,c;if(3>g&&checkRoundingDigits(c.d,u-o,h,g))m.precision=u+=10,n=d=l=new m(1),p=0,g++;else return finalise(c,m.precision=f,h,external=!0)}c=l}}function naturalLogarithm(i,s){var o,r,d,l,u,g,p,a,m,h,f,E=1,b=i,N=b.d,q=b.constructor,O=q.rounding,v=q.precision;if(0>b.s||!N||!N[0]||!b.e&&1==N[0]&&1==N.length)return new q(N&&!N[0]?-1/0:1==b.s?N?0:b:NaN);if(null==s?(external=!1,m=v):m=s,q.precision=m+=10,o=digitsToString(N),r=o.charAt(0),15e14>Math.abs(l=b.e)){for(;7>r&&1!=r||1==r&&3<o.charAt(1);)b=b.times(i),o=digitsToString(b.d),r=o.charAt(0),E++;l=b.e,1<r?(b=new q("0."+o),l++):b=new q(r+"."+o.slice(1))}else return a=getLn10(q,m+2,v).times(l+""),b=naturalLogarithm(new q(r+"."+o.slice(1)),m-10).plus(a),q.precision=v,null==s?finalise(b,v,O,external=!0):b;for(h=b,p=u=b=divide(b.minus(1),b.plus(1),m,1),f=finalise(b.times(b),m,1),d=3;;){if(u=finalise(u.times(f),m,1),a=p.plus(divide(u,new q(d),m,1)),digitsToString(a.d).slice(0,m)===digitsToString(p.d).slice(0,m)){if(p=p.times(2),0!==l&&(p=p.plus(getLn10(q,m+2,v).times(l+""))),p=divide(p,new q(E),m,1),null!=s)return q.precision=v,p;if(checkRoundingDigits(p.d,m-10,O,g))q.precision=m+=10,a=u=b=divide(h.minus(1),h.plus(1),m,1),f=finalise(b.times(b),m,1),d=g=1;else return finalise(p,q.precision=v,O,external=!0)}p=a,d+=2}}function nonFiniteToString(e){return e.s*e.s/0+""}function parseDecimal(s,n){var t,o,r;for(-1<(t=n.indexOf("."))&&(n=n.replace(".","")),0<(o=n.search(/e/i))?(0>t&&(t=o),t+=+n.slice(o+1),n=n.substring(0,o)):0>t&&(t=n.length),o=0;48===n.charCodeAt(o);o++);for(r=n.length;48===n.charCodeAt(r-1);--r);if(n=n.slice(o,r),n){if(r-=o,s.e=t=t-o-1,s.d=[],o=(t+1)%LOG_BASE,0>t&&(o+=LOG_BASE),o<r){for(o&&s.d.push(+n.slice(0,o)),r-=LOG_BASE;o<r;)s.d.push(+n.slice(o,o+=LOG_BASE));n=n.slice(o),o=LOG_BASE-n.length}else o-=r;for(;o--;)n+="0";s.d.push(+n),external&&(s.e>s.constructor.maxE?(s.d=null,s.e=NaN):s.e<s.constructor.minE&&(s.e=0,s.d=[0]))}else s.e=0,s.d=[0];return s}function parseOther(e,s){var n,t,o,r,d,c,l,u,g;if(-1<s.indexOf("_")){if(s=s.replace(/(\d)_(?=\d)/g,"$1"),isDecimal.test(s))return parseDecimal(e,s);}else if("Infinity"===s||"NaN"===s)return+s||(e.s=NaN),e.e=NaN,e.d=null,e;if(isHex.test(s))n=16,s=s.toLowerCase();else if(isBinary.test(s))n=2;else if(isOctal.test(s))n=8;else throw Error(invalidArgument+s);for(r=s.search(/p/i),0<r?(l=+s.slice(r+1),s=s.substring(2,r)):s=s.slice(2),r=s.indexOf("."),d=0<=r,t=e.constructor,d&&(s=s.replace(".",""),c=s.length,r=c-r,o=intPow(t,new t(n),r,2*r)),u=convertBase(s,n,BASE),g=u.length-1,r=g;0===u[r];--r)u.pop();return 0>r?new t(0*e.s):(e.e=getBase10Exponent(u,g),e.d=u,external=!1,d&&(e=divide(e,o,4*c)),l&&(e=e.times(54>Math.abs(l)?mathpow(2,l):Decimal.pow(2,l))),external=!0,e)}function sine(e,i){var s,n=i.d.length;if(3>n)return i.isZero()?i:taylorSeries(e,2,i,i);s=1.4*Math.sqrt(n),s=16<s?16:0|s,i=i.times(1/tinyPow(5,s)),i=taylorSeries(e,2,i,i);for(var t,o=new e(5),r=new e(16),d=new e(20);s--;)t=i.times(i),i=i.times(o.plus(t.times(r.times(t).minus(d))));return i}function taylorSeries(e,s,o,r,d){var c,l,g,p,a=1,m=e.precision,h=Math.ceil(m/LOG_BASE);for(external=!1,p=o.times(o),g=new e(r);;){if(l=divide(g.times(p),new e(s++*s++),m,1),g=d?r.plus(l):r.minus(l),r=divide(l.times(p),new e(s++*s++),m,1),l=g.plus(r),void 0!==l.d[h]){for(c=h;l.d[c]===g.d[c]&&c--;);if(-1==c)break}c=g,g=r,r=l,l=c,a++}return external=!0,l.d.length=h+1,l}function tinyPow(i,s){for(var t=i;--s;)t*=i;return t}function toLessThanHalfPi(e,i){var s,n=0>i.s,o=getPi(e,e.precision,1),r=o.times(.5);if(i=i.abs(),i.lte(r))return quadrant=n?4:1,i;if(s=i.divToInt(o),s.isZero())quadrant=n?3:2;else{if(i=i.minus(s.times(o)),i.lte(r))return quadrant=isOdd(s)?n?2:3:n?4:1,i;quadrant=isOdd(s)?n?1:4:n?3:2}return i.minus(o).abs()}function toStringBinary(s,n,t,o){var r,d,c,l,u,g,p,a,m,h=s.constructor,f=void 0!==t;if(f?(checkInt32(t,1,MAX_DIGITS),void 0===o?o=h.rounding:checkInt32(o,0,8)):(t=h.precision,o=h.rounding),!s.isFinite())p=nonFiniteToString(s);else{for(p=finiteToString(s),c=p.indexOf("."),f?(r=2,16==n?t=4*t-3:8==n&&(t=3*t-2)):r=n,0<=c&&(p=p.replace(".",""),m=new h(1),m.e=p.length-c,m.d=convertBase(finiteToString(m),10,r),m.e=m.d.length),a=convertBase(p,10,r),d=u=a.length;0==a[--u];)a.pop();if(!a[0])p=f?"0p+0":"0";else{if(0>c?d--:(s=new h(s),s.d=a,s.e=d,s=divide(s,m,t,o,0,r),a=s.d,d=s.e,g=inexact),c=a[t],l=r/2,g=g||void 0!==a[t+1],g=4>o?(void 0!==c||g)&&(0===o||o===(0>s.s?3:2)):c>l||c===l&&(4===o||g||6===o&&1&a[t-1]||o===(0>s.s?8:7)),a.length=t,g)for(;++a[--t]>r-1;)a[t]=0,t||(++d,a.unshift(1));for(u=a.length;!a[u-1];--u);for(c=0,p="";c<u;c++)p+=NUMERALS.charAt(a[c]);if(f){if(1<u)if(16==n||8==n){for(c=16==n?4:3,--u;u%c;u++)p+="0";for(a=convertBase(p,r,n),u=a.length;!a[u-1];--u);for(c=1,p="1.";c<u;c++)p+=NUMERALS.charAt(a[c])}else p=p.charAt(0)+"."+p.slice(1);p=p+(0>d?"p":"p+")+d}else if(0>d){for(;++d;)p="0"+p;p="0."+p}else if(++d>u)for(d-=u;d--;)p+="0";else d<u&&(p=p.slice(0,d)+"."+p.slice(d))}p=(16==n?"0x":2==n?"0b":8==n?"0o":"")+p}return 0>s.s?"-"+p:p}function truncate(e,i){if(e.length>i)return e.length=i,!0}function abs(e){return new this(e).abs()}function acos(e){return new this(e).acos()}function acosh(e){return new this(e).acosh()}function add(e,i){return new this(e).plus(i)}function asin(e){return new this(e).asin()}function asinh(e){return new this(e).asinh()}function atan(e){return new this(e).atan()}function atanh(e){return new this(e).atanh()}function atan2(e,i){e=new this(e),i=new this(i);var s,n=this.precision,t=this.rounding,o=n+4;return e.s&&i.s?e.d||i.d?!i.d||e.isZero()?(s=0>i.s?getPi(this,n,t):new this(0),s.s=e.s):!e.d||i.isZero()?(s=getPi(this,o,1).times(.5),s.s=e.s):0>i.s?(this.precision=o,this.rounding=1,s=this.atan(divide(e,i,o,1)),i=getPi(this,o,1),this.precision=n,this.rounding=t,s=0>e.s?s.minus(i):s.plus(i)):s=this.atan(divide(e,i,o,1)):(s=getPi(this,o,1).times(0<i.s?.25:.75),s.s=e.s):s=new this(NaN),s}function cbrt(e){return new this(e).cbrt()}function ceil(e){return finalise(e=new this(e),e.e+1,2)}function clamp(e,i,s){return new this(e).clamp(i,s)}function config(e){if(!e||"object"!=typeof e)throw Error("[DecimalError] Object expected");var s,n,t,o=!0===e.defaults,r=["precision",1,MAX_DIGITS,"rounding",0,8,"toExpNeg",-9000000000000000,0,"toExpPos",0,EXP_LIMIT,"maxE",0,EXP_LIMIT,"minE",-9000000000000000,0,"modulo",0,9];for(s=0;s<r.length;s+=3)if((n=r[s],o)&&(this[n]=DEFAULTS[n]),void 0!==(t=e[n]))if(mathfloor(t)===t&&t>=r[s+1]&&t<=r[s+2])this[n]=t;else throw Error(invalidArgument+n+": "+t);if((n="crypto",o)&&(this[n]=DEFAULTS[n]),void 0!==(t=e[n]))if(!0!==t&&!1!==t&&0!==t&&1!==t)throw Error(invalidArgument+n+": "+t);else if(!t)this[n]=!1;else if("undefined"!=typeof crypto&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[n]=!0;else throw Error(cryptoUnavailable);return this}function cos(e){return new this(e).cos()}function cosh(e){return new this(e).cosh()}function clone(e){function s(n){var o,r,d,c=this;if(!(c instanceof s))return new s(n);if(c.constructor=s,isDecimalInstance(n))return c.s=n.s,void(external?!n.d||n.e>s.maxE?(c.e=NaN,c.d=null):n.e<s.minE?(c.e=0,c.d=[0]):(c.e=n.e,c.d=n.d.slice()):(c.e=n.e,c.d=n.d?n.d.slice():n.d));if(d=typeof n,"number"===d){if(0===n)return c.s=0>1/n?-1:1,c.e=0,void(c.d=[0]);if(0>n?(n=-n,c.s=-1):c.s=1,n===~~n&&1e7>n){for(o=0,r=n;10<=r;r/=10)o++;return void(external?o>s.maxE?(c.e=NaN,c.d=null):o<s.minE?(c.e=0,c.d=[0]):(c.e=o,c.d=[n]):(c.e=o,c.d=[n]))}return 0==0*n?parseDecimal(c,n.toString()):(n||(c.s=NaN),c.e=NaN,void(c.d=null))}if("string"!==d)throw Error(invalidArgument+n);return 45===(r=n.charCodeAt(0))?(n=n.slice(1),c.s=-1):(43===r&&(n=n.slice(1)),c.s=1),isDecimal.test(n)?parseDecimal(c,n):parseOther(c,n)}var n,t,o;if(s.prototype=P,s.ROUND_UP=0,s.ROUND_DOWN=1,s.ROUND_CEIL=2,s.ROUND_FLOOR=3,s.ROUND_HALF_UP=4,s.ROUND_HALF_DOWN=5,s.ROUND_HALF_EVEN=6,s.ROUND_HALF_CEIL=7,s.ROUND_HALF_FLOOR=8,s.EUCLID=9,s.config=s.set=config,s.clone=clone,s.isDecimal=isDecimalInstance,s.abs=abs,s.acos=acos,s.acosh=acosh,s.add=add,s.asin=asin,s.asinh=asinh,s.atan=atan,s.atanh=atanh,s.atan2=atan2,s.cbrt=cbrt,s.ceil=ceil,s.clamp=clamp,s.cos=cos,s.cosh=cosh,s.div=div,s.exp=exp,s.floor=floor,s.hypot=hypot,s.ln=ln,s.log=log,s.log10=log10,s.log2=log2,s.max=max,s.min=min,s.mod=mod,s.mul=mul,s.pow=pow,s.random=random,s.round=round,s.sign=sign,s.sin=sin,s.sinh=sinh,s.sqrt=sqrt,s.sub=sub,s.sum=sum,s.tan=tan,s.tanh=tanh,s.trunc=trunc,void 0===e&&(e={}),e&&!0!==e.defaults)for(o=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],n=0;n<o.length;)e.hasOwnProperty(t=o[n++])||(e[t]=this[t]);return s.config(e),s}function div(e,i){return new this(e).div(i)}function exp(e){return new this(e).exp()}function floor(e){return finalise(e=new this(e),e.e+1,3)}function hypot(){var e,s,o=new this(0);for(external=!1,e=0;e<arguments.length;)if(s=new this(arguments[e++]),!s.d){if(s.s)return external=!0,new this(1/0);o=s}else o.d&&(o=o.plus(s.times(s)));return external=!0,o.sqrt()}function isDecimalInstance(e){return e instanceof Decimal||e&&e.toStringTag===tag||!1}function ln(e){return new this(e).ln()}function log(e,i){return new this(e).log(i)}function log2(e){return new this(e).log(2)}function log10(e){return new this(e).log(10)}function max(){return maxOrMin(this,arguments,"lt")}function min(){return maxOrMin(this,arguments,"gt")}function mod(e,i){return new this(e).mod(i)}function mul(e,i){return new this(e).mul(i)}function pow(e,i){return new this(e).pow(i)}function random(s){var t,o,c,l,u=0,g=new this(1),r=[];if(void 0===s?s=this.precision:checkInt32(s,1,MAX_DIGITS),c=Math.ceil(s/LOG_BASE),!this.crypto)for(;u<c;)r[u++]=0|1e7*Math.random();else if(crypto.getRandomValues)for(t=crypto.getRandomValues(new Uint32Array(c));u<c;)l=t[u],429e7<=l?t[u]=crypto.getRandomValues(new Uint32Array(1))[0]:r[u++]=l%1e7;else if(crypto.randomBytes){for(t=crypto.randomBytes(c*=4);u<c;)l=t[u]+(t[u+1]<<8)+(t[u+2]<<16)+((127&t[u+3])<<24),214e7<=l?crypto.randomBytes(4).copy(t,u):(r.push(l%1e7),u+=4);u=c/4}else throw Error(cryptoUnavailable);for(c=r[--u],s%=LOG_BASE,c&&s&&(l=mathpow(10,LOG_BASE-s),r[u]=(0|c/l)*l);0===r[u];u--)r.pop();if(0>u)o=0,r=[0];else{for(o=-1;0===r[0];o-=LOG_BASE)r.shift();for(c=1,l=r[0];10<=l;l/=10)c++;c<LOG_BASE&&(o-=LOG_BASE-c)}return g.e=o,g.d=r,g}function round(e){return finalise(e=new this(e),e.e+1,this.rounding)}function sign(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function sin(e){return new this(e).sin()}function sinh(e){return new this(e).sinh()}function sqrt(e){return new this(e).sqrt()}function sub(e,i){return new this(e).sub(i)}function sum(){var e=0,s=arguments,n=new this(s[e]);for(external=!1;n.s&&++e<s.length;)n=n.plus(s[e]);return external=!0,finalise(n,this.precision,this.rounding)}function tan(e){return new this(e).tan()}function tanh(e){return new this(e).tanh()}function trunc(e){return finalise(e=new this(e),e.e+1,1)}P[Symbol.for("nodejs.util.inspect.custom")]=P.toString,P[Symbol.toStringTag]="Decimal";export var Decimal=P.constructor=clone(DEFAULTS);LN10=new Decimal(LN10),PI=new Decimal(PI);export default Decimal;