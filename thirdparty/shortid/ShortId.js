function ShortId(){this.alphabet="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",this.length=8}ShortId.generate=function(t){var h=new ShortId;(0===t||"undefined"==t)&&(t=this.length);for(var a="",e=0;t>e;e++)a+=h.alphabet.charAt(Math.floor(Math.random()*h.alphabet.length));return a};
