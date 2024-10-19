// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
import ChartSec from "@/components/dashboard/root/ChartsSec";
import ResizableHandle from "@/components/dashboard/root/ResizableLayout";
import Hero from "@/components/home/hero";

import { ChevronDown } from "lucide-react";
import { auth } from "@/auth";

export default async function Home() {
  // const layout = cookies().get("react-resizable-panels:layout:mail");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const session = await auth();
  console.log(session);

  return (
    <main className="p-8">
      <div className="flex flex-wrap gap-6 mb-10 place-items-center justify-between">
        <div className="text_group flex flex-col gap-2">
          <h1 className="font-clash text-4xl font-medium">
            Welcome {"Rashid..."}
          </h1>
          <p className="text-sm mt-[-0.7em] opacity-60">
            Here’s the latest data on your store {"{store name}"}
          </p>
        </div>
        <Button className="px-6 pr-4">
          Last 7 Days
          <ChevronDown />
        </Button>
      </div>
      <ChartSec className="mb-10"></ChartSec>
      <div className=" opacity-65">
        Lorem ipsum odor amet, consectetuer advising elit. Litora vestibulum
        mauris fermentum ipsum leo hendrerit. Tempor malesuada sapien malesuada
        curabitur varius quis, habitasse ut sagittis. Suscipit sapien vel
        elementum augue hac hac venenatis senectus. Ullamcorper odio pharetra
        tempor fames donec commodo neque nam. Egestas per gravida porttitor erat
        interdum tellus natoque. Elit aenean sagittis suspendisse vestibulum,
        porta class hac vulputate. Ante ante bibendum ex tincidunt leo torquent,
        et sapien. Massa auctor venenatis maximus sed eget cursus netus mauris.
        Etiam praesent finibus turpis, nascetur litora dictumst ex viverra id.
        Est himenaeos pulvinar molestie egestas velit per. Sem lectus fames
        dapibus mattis blandit mauris, curabitur conubia. Primis inceptos rutrum
        suscipit sodales posuere maecenas primis auctor. Placerat metus lacinia
        molestie donec, rutrum facilisi. Aliquam ultricies non suscipit eget
        laoreet. Praesent semper id pulvinar ullamcorper torquent mollis orci
        quis. Ipsum vivamus commodo accumsan odio bibendum litora. Class semper
        facilisis aliquam adipiscing porta integer. Nec ex ad mus massa cursus
        blandit. Amet eros tincidunt hac ad per sociosqu massa. Sodales
        ultricies facilisi vestibulum nascetur potenti, viverra tristique
        iaculis. Dis fringilla molestie ut morbi sociosqu neque placerat. Libero
        ac morbi ante ac himenaeos est sagittis. Himenaeos tortor auctor laoreet
        hendrerit mus eros. Duis eget dictum efficitur lobortis mus; imperdiet
        inceptos. Luctus eleifend placerat imperdiet in imperdiet vitae
        hendrerit. Porttitor interdum orci nisi metus condimentum ullamcorper
        sagittis sociosqu. Quisque diam cubilia; proin eget fringilla
        consectetur. Platea felis tellus leo massa accumsan. Diam montes dis
        luctus quisque, hac porta sed sollicitudin nisi. Habitasse felis commodo
        gravida metus hac maximus nibh dolor ullamcorper. Nisi et cras quis duis
        et himenaeos. Suspendisse fames eu tristique dolor conubia cursus eu.
        Laoreet proin odio dictum maximus congue eu suscipit. Habitant at amet;
        sociosqu venenatis diam nisl. Interdum integer aliquet erat; auctor
        ullamcorper libero pulvinar malesuada? Facilisis malesuada inceptos
        etiam lectus quam; euismod odio ac. Taciti per augue leo arcu eleifend
        ultrices non. Dictumst luctus sociosqu eros amet auctor aenean libero
        metus quisque. Maximus nisi dis; quam habitasse nibh dui dui. Mattis per
        neque blandit nullam eu congue lacinia curabitur. Auctor fames semper
        taciti placerat litora finibus neque. Fames nisl per ornare mus morbi
        luctus aliquet rhoncus sodales. Proin enim mi mi convallis habitasse
        etiam. Purus libero tellus cubilia per curabitur elementum. Quam aenean
        lobortis ultrices curabitur; dapibus felis bibendum purus. Posuere at
        curabitur; tempus mi bibendum ex lorem. Sollicitudin aliquam inceptos
        orci fusce id, cursus vitae commodo. Bibendum eget felis; enim
        pellentesque rhoncus lectus feugiat phasellus. Libero tellus posuere
        taciti lobortis eget dapibus potenti. Hac facilisi pharetra ante
        himenaeos sed, lacinia habitant lectus. Faucibus maximus massa velit
        facilisi duis netus arcu dignissim conubia. Non fermentum nascetur
        auctor eleifend parturient et. Nulla integer magnis ultrices orci
        volutpat iaculis nulla inceptos class. Netus nibh egestas rhoncus
        sollicitudin cursus hendrerit. Convallis aliquam diam suspendisse;
        praesent eleifend gravida velit. Lacinia leo maximus erat neque
        condimentum? Convallis augue curabitur lacus ullamcorper felis habitant
        tincidunt viverra urna. Senectus vitae magnis augue aenean tristique
        condimentum mus. Venenatis potenti eros; nibh morbi nunc penatibus
        libero malesuada etiam. Massa penatibus diam augue tempus ridiculus.
        Rhoncus at ridiculus potenti cubilia tempor. Posuere sapien tristique
        lacus sit laoreet platea efficitur. Himenaeos litora dui duis purus orci
        himenaeos. Nibh mauris duis morbi taciti feugiat. Morbi pretium magna
        tempor taciti montes a habitant proin in. Eros turpis netus magnis;
        metus aptent etiam facilisi. Ut placerat vivamus vestibulum eu aenean
        sem erat vitae etiam. Volutpat platea risus et at potenti morbi. Vivamus
        consectetur tortor eget efficitur himenaeos lectus. Accumsan fermentum
        rutrum tellus; ipsum mus mattis. Vestibulum ornare ornare volutpat,
        sociosqu montes magnis duis. Et maximus maximus, nascetur condimentum
        neque turpis. Aliquet a per dapibus fermentum interdum at pellentesque.
        Congue sit eget efficitur fermentum aptent vel cubilia. Primis curabitur
        litora mi tristique hac. Ornare sit ex lobortis metus molestie aptent
        feugiat mollis. Quisque egestas scelerisque praesent, blandit quam
        parturient nisl. Vehicula sem in mi dictumst nunc varius elit consequat.
        Morbi maximus ridiculus nisl ultrices dictumst imperdiet felis inceptos.
        Placerat justo pulvinar sapien non potenti sociosqu a. Porta
        sollicitudin elementum pulvinar urna ultrices porttitor hendrerit purus.
        Facilisi vivamus euismod suspendisse egestas felis? Amet quisque
        placerat conubia nullam gravida. Natoque euismod iaculis proin pretium
        iaculis auctor pulvinar. Enim maecenas sit vivamus erat eu tincidunt
        tortor vestibulum. Rhoncus purus sit sagittis vestibulum nostra pretium.
        Rhoncus sollicitudin nisi facilisis est nec nunc auctor sodales. Metus
        interdum vestibulum placerat commodo integer tempus consectetur
        vulputate. Maximus quis suspendisse tortor sagittis massa mi enim
        lacinia. Dignissim sociosqu curabitur pellentesque ridiculus ridiculus
        vitae interdum. Sodales ipsum tempus orci turpis ipsum. Consectetur elit
        laoreet himenaeos mi class montes felis aliquam. Quisque sagittis netus
        dapibus et viverra curae. Eros auctor venenatis urna maecenas gravida;
        eros lacus. Blandit natoque facilisi senectus auctor elit ac nunc
        tincidunt. Suscipit conubia mollis conubia aliquam convallis sed.
        Curabitur malesuada finibus eget sem sodales nibh magnis dapibus. Eget
        euismod dui bibendum conubia malesuada curabitur ultrices laoreet.
        Rutrum montes pellentesque velit id magna. Viverra morbi odio at
        volutpat luctus? Habitasse sem conubia blandit molestie sagittis
        inceptos fames finibus. Faucibus pulvinar porttitor congue penatibus
        lorem lacinia platea. Magnis praesent ut risus volutpat ipsum.
        Suspendisse blandit urna bibendum dolor lorem suspendisse tempus. Dolor
        feugiat cubilia sed felis facilisis conubia. Congue potenti quis urna
        fames quis urna. Scelerisque gravida lobortis risus diam blandit. Risus
        penatibus enim justo maximus dictumst libero. Accumsan lacinia facilisis
        aliquet volutpat ad tincidunt. Platea tristique malesuada etiam felis
        malesuada montes. Consequat urna elit efficitur; nascetur donec
        fringilla. Mus porta senectus blandit elit bibendum cubilia augue dolor.
        Pellentesque porttitor vehicula mattis ex nullam sem consectetur eros
        laoreet. Adipiscing imperdiet tristique dignissim semper habitant
        finibus. Dapibus efficitur nam vel urna erat semper dapibus suspendisse.
        Vulputate et class felis ante commodo fermentum cras cursus. Erat elit
        curabitur conubia tincidunt hac; odio magnis mattis magna. Mollis at
        vel; pretium velit viverra posuere imperdiet. Primis vitae tempus diam
        mollis eleifend lacus. Commodo adipiscing praesent aliquam faucibus ad
        ultricies cras vehicula. Efficitur dignissim conubia magna laoreet;
        suscipit placerat. Ipsum tristique commodo dapibus lacinia per vulputate
        ridiculus nec donec. Amet semper sollicitudin quis himenaeos dolor.
        Iaculis habitant conubia euismod natoque litora; aenean commodo faucibus
        odio. Aptent suspendisse fringilla quam maecenas arcu placerat a. Mauris
        pharetra varius pellentesque leo aenean primis neque maecenas. Magna eu
        sit venenatis parturient etiam sodales. Eget aliquam mattis nulla
        rhoncus sapien felis. Nec purus suscipit tempus vel pharetra sit.
        Consequat a lorem commodo faucibus lacus. Tellus sagittis ridiculus
        maximus scelerisque class. Velit ligula lobortis sit pharetra felis.
        Molestie ipsum malesuada, litora justo fusce varius euismod
        sollicitudin. Varius taciti ullamcorper aptent a efficitur a. Lectus
        faucibus nunc purus inceptos ex nostra nulla. Habitant consequat
        himenaeos nisl ultricies tristique posuere tristique accumsan per.
        Habitasse malesuada aliquet pretium nascetur eleifend mus viverra nibh
        leo. Interdum nascetur mus nulla nec, quisque cursus sodales. Eros
        dapibus porttitor eros rhoncus mattis. Torquent dolor phasellus; aliquam
        risus hendrerit laoreet ipsum cursus. Congue enim conubia ornare aptent
        orci proin. Sem sed ornare egestas; feugiat fringilla fringilla. Etiam
        nec fames placerat rutrum ultricies orci aenean dapibus ex. Tempus
        suscipit lacinia efficitur per, facilisis rutrum pellentesque metus.
        Lacus nam bibendum amet viverra vitae ornare. Parturient nunc mi tempus
        ante dui facilisi class suspendisse. Tempor inceptos tempus sed in,
        semper felis vel. Netus nunc aptent aliquam ullamcorper consequat.
        Cursus viverra cras nisi inceptos malesuada ipsum sem. Dictumst natoque
        consequat tortor facilisis congue. Eros a neque maecenas sem semper
        natoque efficitur aenean magnis. Tortor fusce pharetra fringilla, magna
        dolor ligula. Sem etiam a eget; tellus tortor fermentum. Neque commodo
        fringilla, commodo taciti vulputate sociosqu. Malesuada mattis inceptos
        erat pretium senectus vulputate ligula sociosqu. Sociosqu class
        ridiculus venenatis sollicitudin varius risus phasellus. Tellus laoreet
        fames blandit pellentesque pretium purus. Maecenas finibus ipsum pretium
        fames himenaeos malesuada praesent vel. At conubia dapibus consectetur
        dignissim ornare, interdum amet ex erat. Taciti iaculis mattis enim
        tincidunt efficitur torquent. Etiam habitasse dictum; tristique at
        egestas id. Eleifend dignissim netus nullam himenaeos fusce. Eget
        habitant volutpat eleifend ullamcorper egestas mattis primis. Erat class
        turpis eu lobortis nascetur lobortis neque maecenas. Vivamus nascetur
        dapibus; blandit felis ultricies sed quis. Montes purus cursus posuere
        maximus cursus aenean. Consequat laoreet nascetur id scelerisque conubia
        quisque turpis. Erat ridiculus phasellus placerat odio condimentum
        sodales quam parturient. Fames habitasse condimentum vehicula aenean
        consequat eget nisi ornare. Maximus at est velit euismod; potenti dolor
        tellus ipsum. Nascetur interdum semper purus mollis sapien sit ipsum
        aptent. Sociosqu quisque egestas elit diam est finibus. Bibendum felis
        platea natoque maximus curabitur consectetur eleifend quis phasellus.
        Vivamus lacus ligula leo dolor, gravida id. Nostra vehicula lectus ipsum
        eu lacinia fermentum risus fusce. Eu pellentesque erat congue aptent
        accumsan vel. Tellus magnis potenti vulputate curabitur; rutrum
        vestibulum lacinia. Sollicitudin gravida ornare; aliquam leo montes
        sapien a. Dolor augue fringilla semper tristique, metus fermentum dui.
        Mi luctus luctus accumsan ex id. Donec dui senectus; felis malesuada
        pellentesque vestibulum. Fusce donec volutpat turpis ullamcorper
        finibus. Eros sollicitudin himenaeos nullam interdum vestibulum
        porttitor varius semper. Amolestie imperdiet gravida condimentum, ligula
        ornare suscipit finibus. Vehicula sit montes eu eros diam tempus
        imperdiet. Tempus duis laoreet volutpat senectus dui ut tempus magnis
        cursus. Orci ipsum tristique ornare elementum nisi hendrerit vehicula
        iaculis. Imperdiet tortor nascetur gravida quam pulvinar dictumst
        vestibulum. Gravida odio tristique ligula; vitae felis pharetra mauris.
        Justo imperdiet dignissim parturient fringilla libero gravida. Turpis
        neque felis litora convallis ad parturient nisl inceptos. Ullamcorper
        nisl platea adipiscing dignissim euismod vitae proin senectus. Fusce
        finibus habitant bibendum ad primis sit enim tempus nulla. Conubia
        hendrerit etiam sociosqu vitae; aliquet aliquam neque dignissim. Pretium
        ridiculus posuere in molestie pharetra fames. Etiam penatibus montes
        tristique facilisi faucibus arcu potenti habitasse. Lacinia praesent
        nisi consectetur rutrum curae finibus aliquet rhoncus dignissim.
        Maecenas diam curae integer dapibus posuere. Magnis arcu parturient
        habitant tortor vestibulum curae sollicitudin. Sed ridiculus laoreet
        tempus amet tortor ac. Eros sollicitudin mi commodo libero in. Maximus
        eros dictumst donec placerat; duis per vehicula. Nunc quisque at
        facilisis turpis sociosqu taciti orci. Netus aenean nulla praesent
        ultricies montes elit. Elementum adipiscing imperdiet purus himenaeos
        tortor inceptos. Ligula libero lectus interdum aliquet maecenas class
        consequat sed phasellus. Penatibus ac lobortis ipsum erat felis
        accumsan. Rhoncus per feugiat nibh quis inceptos pulvinar auctor libero
        congue. Odio ultrices ex auctor mi maximus eros torquent nibh. Varius
        tristique molestie malesuada semper magna litora nullam cubilia.
        Habitant etiam per blandit odio maecenas maximus accumsan ligula.
        Laoreet tempor aliquet lectus pretium nisl natoque. Mattis nibh mi
        tempus justo nascetur senectus semper vivamus. Placerat dapibus aptent
        praesent ornare ante torquent. Dolor viverra dui sit sapien, tortor
        proin ultricies! Sapien auctor consequat senectus feugiat fermentum quis
        viverra nisl nec. Quam primis nunc tristique; gravida inceptos morbi
        senectus aliquam. Lacinia scelerisque vestibulum massa augue magna
        consequat hendrerit mauris in. Odio massa per fermentum per auctor
        malesuada fringilla. Ante sem vivamus nec suspendisse imperdiet torquent
        vestibulum scelerisque. Eros parturient porttitor, tempor dictum tortor
        malesuada ornare. Massa himenaeos odio nullam nisi tortor vivamus. Sit
        lectus potenti rhoncus nunc non ligula. Inceptos at arcu hendrerit
        viverra dapibus.
      </div>
    </main>
  );
}
