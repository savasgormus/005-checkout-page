taxRate'i tanımladık.
shippingPrice'ı tanımladık.
    aşağıdaki işlemi farklı web sayfaları olsaydı yukarıdaki tanımlamaları her sayfa için yapmamak adına yapıyoruz:
   
window'a "load" durumunda bir addevent listener tanımlıyoruz:
    localStorage'a "taxRate" için bir değer atadık.
    localStorage'a "shippingPrice" için bir değer atadık.
    sessionStorage'a "taxRate" için bir değer atadık.
    sessionStorage'a "shippingPrice" için bir değer atadık.


    // capturing yöntemi ile bir butona tıkladığımızda aynı zamanda içinde bulunduğu div'e de tıklamış oluyoruz. ters bir inheritance durumu var. 

LET = querySelector ile classı products olan bir div'i seçtik ve değişkene atadık.
productsDiv değişkenine tıklama durumunda olacak addeventlistener'ı tanımlıyoruz.
    LET = quantityP isimli bir değişken tanımladık. değişkenimiz tıkladığımız target'ın product-quantity id'sine sahip 2 üst parent elementi.



--- Minus Button ---
    IF event target'ımızın classında "fa-minus" varsa
      VE event target'ımız quantityP'nin parentelementinin ilk child elementi ise:
        
        IF quantity innertext'i 1'den büyükse
            quantity innertextini 1 azalt;
            calculateProductTotal fonksiyonunu çağır.
        ELSE 
            IF confirm ile uyarı ver
                quantityP'nin 3 parent element üstünü sil. (ürünün olduğu div'i ortadan kaldırdık.)
                calculateCartTotal fonksiyonunu çağır.



--- Plus Button ---
    ELSE IF event target'ımızın classında "fa-plus" varsa
      VE event target'ımız quantityP'nin parentelementinin son child elementi ise:
        
        quantity innertext'i 1 arttır;
        calculateProductTotal fonksiyonunu çağır.


--- Remove Button
    ELSE IF evet target'ımızın classname'i "remove-product" ise
        IF confirm ile uyarı ver:
            quantityP'nin 3 parent element üstünü sil. (ürünün olduğu div'i ortadan kaldırdık.)
            calculateCartTotal fonksiyonunu çağır.





--- Calculate Cart and Product Total ---

CONST calculateProductTotal (quantityP) için bir ARROW FUNC oluştur:
    LET productPrice
        quantityP'nin 2 element üstünden(product-info'ya ulaştık) STRONG tagine sahip elemanı ata.
    LET productTotalPriceDiv
        quantityP'nin 3 element üstünden(product-info'ya ulaştık) product-total-price classına sahip elemanı ata.

    productTotalPriceDiv'in innertexti =
        productPrice * quantityP'nin innertexti. toFixed(2) ile ilk 2 ondalığı al.

    calcutateCartTotal fonksiyonunu çağır.


CONST calculateCartTotal () için bir ARROW FUNC oluştur:
    LET bütün producttotalDivleri al. querySelectorAll ile product-line-price classına sahip divleri al.
    LET subtotal = 0;

    FOREACH productTotalPriceDivs'i foreach ile döngüye sok(eachproduct) => 
        subtotal += PARSEFLOAT ile productTotalPriceDivs'in innertextlerini topla


    LET taxPrice = subtotal * localstorage'dan gelen "taxRate"
    LET shipping =
        IF subtotal > 0 PARSEFLOAT(localstorage('shippingPrice')) ELSE 0 (Ternary yapısı)
    LET cartTotal = subtotal + taxPrice + shippingPrice;



localstorage'a taxRate ve shippingPrice'ı ekledik. böylece diğer tüm sayfalarda tek tek bu iki variable'ı kullanmak yerine direk localstorage'dan çekip kullanıyoruz.

bir sonraki adımda da sessionstorage'a kaydettik. sessionstorage'a değerleri sadece bu sayfada kullanılır. Browser'ı kapatıp açtığımızda değerleri kaybolur.

Bubble'ing:
bir butona tıkladığımızda aynı zamanda içinde bulunduğu div'e de tıklamış oluyoruz. ters bir inheritance durumu var. yani remove butonuna tıkladığımızda bütün div'i silmesi gibi.

capturing:
bir div'e tıkladığımızda dolaylı olarak içinde bulunduğu butonun çalışmasını istediğimiz zaman çalışır. bubble'ingin tam tersi.

for döngüsünde 3 tane + - ve remove butonumuz olacak. 3 ürün daha eklersek bütün butonları tekrar tanımlamamız gibi bir ihtiyaç duyacak. bunun yerine şöyle bir yöntem uygulayacağız. bu ürünler bir product div'inin içinde. capturing yöntemi ile bütün yeni ürünler bir addeventListener ile product div'inin içinde yer alacak. özetle 1 eventlistener ile bütün ürünleri tanımlayacağız.
