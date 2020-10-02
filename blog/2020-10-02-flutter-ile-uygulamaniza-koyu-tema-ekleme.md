---
slug: 2020/10/02/flutter-ile-uygulamaniza-koyu-tema-ekleme
title: Flutter ile Uygulamanıza Koyu Tema Ekleme
author: Burak Cabadan
author_title: Başkan [2020-2021] @ DSCIZTECH
author_url: https://github.com/burakcbdn
author_image_url: https://avatars0.githubusercontent.com/u/55558309?s=460&u=01abd9c01249db3fe495b00d59e9d3d6b3e1e8ec&v=4
tags: [dsciztech, iztech, 2020, 2021]
---

Son zamanlarda popülerleşen ve her uygulama için neredeyse bir zorunluluk haline
gelen **koyu tema** özelliğini Flutter uygulamalarınızda da oldukça kolay bir
şekide kullanmak mümkün. Bu yazıda Flutter uygulamanıza nasıl koyu tema
ekleyebileceğinizi ve bunu uygulama içinden nasıl kontrol edebileceğinizi
göstereceğim. Bu gösterimi kişisel projem olan BBTasks (basit bir TODO app)
üzerinden yapacağım ve başka bir yazıda da uygulamada bulunan bir farklı özellik
olan “Firebase offline kullanımı” konusunu işleyeceğim. 

<!--truncate-->

*****

Uygulamayı oluşturduktan sonra temayı oluşturmak için yapmamız gereken
**MaterialApp** içinde **theme** ve **darkTheme** parametrelerine istediğimiz
özelliklerle birlikte **ThemeData** eklemek. (Direkt olarak ThemeData.Dark()
eklemek bazı renklerde uyumsuzluk çıkarabileceği için pek tavsiye etmiyorum.)

```dart
MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.white,
        primarySwatch: Colors.grey,
           // ...
        ),
        cupertinoOverrideTheme: CupertinoThemeData(
          primaryColor: Color(0xFF808080),
        ),
      ),
      darkTheme: ThemeData(
        primaryColor: Color(0xFF212121),
        scaffoldBackgroundColor: Color(0xFF303030),
        cupertinoOverrideTheme: CupertinoThemeData(
          primaryColor: Colors.white,
        ),
        canvasColor: Color(0xFF303030),
        dialogBackgroundColor: Color(0xFF303030),
           // ...
      ),
```

Tema renklerini ekledikten sonra yapmamız gereken bir sonraki şey temayı
uygulama içinden kontrol etmek için bir tema kontrolcüsü oluşturmak. Bunu
yaparken temanın kaydedilip uygulama her çalıştırıldığında o temayı kullanması
için **Hive** isimli Flutter paketini kullandım. Hive kullanabilmek için global
bir dosya içinde bir Box oluşturmamız gerekiyor. Aynı dosya içinde yazdığımız
ThemeController objesinden de oluşturmamız gerekiyor ki projenin her yerinde
kullanabilelim.

```dart
library config.globals;
import 'theme_controller.dart';
import 'package:hive/hive.dart';

ThemeController themeController = ThemeController();
Box box;
```
```dart
class ThemeController with ChangeNotifier {
  ThemeController() {
    if (box.containsKey("currentTheme")){
      isDark = box.get("currentTheme");
    }else {
      box.put("currentTheme", isDark);
    }
  }
 bool isDark = false;
  ThemeMode currentTheme() {
    return isDark ? ThemeMode.dark : ThemeMode.light;
  }
  void switchToLight(){
    if (isDark){
      isDark = false;
      box.put("currentTheme", isDark);
      notifyListeners();
    }
  }
  void switchToDark(){
    if (!isDark){
      isDark = true;
      box.put("currentTheme", isDark);
      notifyListeners();
    }
  }
}
```

ThemeController classı içinde oluşturduğumuz **box** objesini kullanarak tema
bilgimizi local’e kaydetmiş olduk. şimdi projemizin her yerinden
**themeController.switchToLight()** ya da **themeController.switchToDark()**
komutunu kullanarak tema modumuzu değiştirebiliriz. Şimdi gelelim bu tema modunu
kullanmaya. (switch metodları içindeki **notifyListeners()** metodundan yazının
ilerleyen kısmında bahsedeceğim)

*****

Hive kullanabilmek için uygulamanın main metodunda bir kaç değişiklik yapmamız
gerekiyor. Main metodunda Hive initialization işlemi için path_provider paketine
de ihtiyacımız olacak

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final appDocumetDirectory =
      await path_provider.getApplicationDocumentsDirectory();
  Hive.init(appDocumetDirectory.path);
  box = await Hive.openBox("themeBox");

  runApp(BBTasks());
}
```

Bu işlemden sonra Hive paketini uygulamada sıkıntısız bir şekilde
kullanabileceğiz.

Hive’ı initialize ettikten sonra yapmamız gereken global olarak oluşturduğumuz
box objesini tamamlamak. Bu sayede “themeBox” isimli bir veri tabanımız oldu

*****

MaterialApp içinde **theme** ve **darkTheme** dışında eklememiz gereken bir
diğer parametre de **themeMode** bu parametre tema kontrolcümüzün döndüreceği
tema modunu kullanarak hangi temayı kullanacağımızı seçecek. Bunu kullanmak için
yapmamız gereken şey **themeMode** paramatresine
**themeController.currentTheme()** methodunu eklemek. Böylece biz switch
methodlarımızı kullandığımızda tema modu değişecek ve MaterialApp temamızı bu
moda göre ayarlayacak.

```dart
MaterialApp(
 // ...
  themeMode: themeController.currentTheme(),
 // ...
)
```

Son olarak, bildiğiniz gibi Flutter’da bir widgetin değişmesi için setState
metodu kullanılmalıdır. Aynı şekilde temamızı değiştirmek için de setState
metodunu kullanacağız. Peki ne zaman? Yazının yukarısında bahsettiğim
**notifyListeners()** metodunu kullanacağımız yer burası. themeController ile
temayı değiştirdiğimizde bu metod, direkt olarak çevirmek gerekirse bu classdaki
değişimleri dinleyenlere uyarı gönderecek. Şimdi göndermesi için bize bir
dinleyici lazım. MaterialApp’ımız olduğu statefull widget’in **initState()**
metodunda themeControllerimize dinleyici ekleyelim.

```dart
 @override
  void initState() {
    
    themeController.addListener(() {
      print("Theme changed");
      setState(() {});
    });
    
    super.initState();
  }
```

Bu sayede themeController class’ında bir değişim olduğunda bilgi verecek ve
setState metodunu çalıştırıp yeni temamıza kavuşmuş olacağız.

Kaynak Kod:
[https://github.com/burakcbdn/BBTasks](https://github.com/burakcbdn/BBTasks)


