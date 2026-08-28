import type { Locale } from "@/i18n/config";

export interface Arcana {
  id: number;
  name: string;
  keyword: string;
  personality: string;
  comfort: string;
  issue: string;
}

const ARCANA_UK: Arcana[] = [
  {
    id: 1,
    name: "Маг",
    keyword: "воля та ініціатива",
    personality:
      "Ви природний лідер із сильною волею — вмієте започаткувати справу і повести за собою інших.",
    comfort:
      "Ваш внутрішній спокій залежить від відчуття контролю над власним життям і простору для дій.",
    issue:
      "Схильність брати забагато на себе і діяти одноосібно там, де варто було б довіритись іншим.",
  },
  {
    id: 2,
    name: "Жриця",
    keyword: "інтуїція та внутрішнє знання",
    personality:
      "Ви тонко відчуваєте людей і ситуації, вмієте чути себе там, де інші покладаються лише на логіку.",
    comfort:
      "Спокій приходить у тиші й усамітненні, коли є час прислухатись до власних відчуттів.",
    issue:
      "Тенденція замовчувати свої потреби й ховатись за завісою таємничості замість відкритої розмови.",
  },
  {
    id: 3,
    name: "Імператриця",
    keyword: "творчість і турбота",
    personality:
      "У вас багата уява та природний хист створювати затишок — у стосунках, домі, справах.",
    comfort:
      "Ви відновлюєтесь через красу, творчість і турботу про близьких.",
    issue:
      "Ризик розчинитися в турботі про інших і забути про власні творчі потреби.",
  },
  {
    id: 4,
    name: "Імператор",
    keyword: "структура та відповідальність",
    personality:
      "Ви вмієте вибудовувати порядок із хаосу й брати відповідальність, яку інші уникають.",
    comfort:
      "Стабільність, чіткі правила і передбачуваність — те, що дає вам відчуття опори.",
    issue:
      "Надмірний контроль і жорсткість там, де ситуація потребує гнучкості.",
  },
  {
    id: 5,
    name: "Ієрофант",
    keyword: "навчання і традиції",
    personality:
      "Ви маєте талант пояснювати складні речі простими словами та передавати досвід іншим.",
    comfort:
      "Внутрішній спокій залежить від порядку, нових знань і опори на перевірені традиції.",
    issue:
      "Схильність повчати замість того, щоб ділитися досвідом із любов'ю і без осуду.",
  },
  {
    id: 6,
    name: "Закохані",
    keyword: "вибір і щирість",
    personality:
      "Для вас важлива щирість у стосунках і свобода робити власний вибір, не озираючись на інших.",
    comfort:
      "Гармонія у близьких стосунках — головне джерело вашого емоційного ресурсу.",
    issue:
      "Складнощі з прийняттям рішень і страх зробити «неправильний» вибір у стосунках.",
  },
  {
    id: 7,
    name: "Колісниця",
    keyword: "рух і цілеспрямованість",
    personality:
      "Ви вмієте мобілізуватись і рухатись до мети навіть у складних обставинах.",
    comfort:
      "Вам потрібен рух, зміни та відчутний прогрес — застій виснажує вас найбільше.",
    issue:
      "Ризик конфліктів через надмірну напористість або бажання все контролювати самостійно.",
  },
  {
    id: 8,
    name: "Справедливість",
    keyword: "баланс і чесність",
    personality:
      "Ви цінуєте чесність і справедливість, вмієте зважено оцінювати ситуацію з різних боків.",
    comfort:
      "Спокій приходить, коли у житті є баланс — між роботою й відпочинком, віддачею і отриманням.",
    issue:
      "Надмірна критичність до себе й інших, коли щось видається «несправедливим».",
  },
  {
    id: 9,
    name: "Пустельник",
    keyword: "самопізнання і глибина",
    personality:
      "Ви маєте схильність до глибокого аналізу і здатність знаходити відповіді у самоті.",
    comfort:
      "Час на самоті для роздумів — те, що відновлює ваші сили найкраще.",
    issue:
      "Ризик надмірної замкненості й уникнення підтримки, коли вона насправді потрібна.",
  },
  {
    id: 10,
    name: "Колесо Фортуни",
    keyword: "цикли та можливості",
    personality:
      "Ви вмієте вловлювати вдалий момент і легко адаптуєтесь до змін навколо.",
    comfort:
      "Довіра до потоку життя і відкритість новому дають вам відчуття рівноваги.",
    issue:
      "Спроби утримати контроль над тим, що природно змінюється, викликають зайве напруження.",
  },
  {
    id: 11,
    name: "Сила",
    keyword: "витримка і м'яка міць",
    personality:
      "Ваша сила — не в тиску, а у витримці, терпінні й здатності впливати м'яко, але переконливо.",
    comfort:
      "Внутрішня рівновага приходить через прийняття себе — без потреби щось постійно долати.",
    issue:
      "Схильність стримувати емоції надто довго, поки вони не проявляються різким вибухом.",
  },
  {
    id: 12,
    name: "Повішений",
    keyword: "інший погляд",
    personality:
      "Ви здатні побачити ситуацію під незвичним кутом і знаходити рішення там, де інші зупиняються.",
    comfort:
      "Пауза, час «нічого не робити» — необхідна умова, щоб зʼявилось нове розуміння.",
    issue:
      "Ризик застрягати в очікуванні «правильного моменту» замість того, щоб діяти.",
  },
  {
    id: 13,
    name: "Смерть",
    keyword: "трансформація",
    personality:
      "Ви вмієте відпускати те, що віджило, і починати нові етапи життя без остраху.",
    comfort:
      "Відчуття, що є простір для змін і нічого не «застигло назавжди», дає вам спокій.",
    issue:
      "Страх перед завершенням етапів життя, що змушує триматись за те, що вже не працює.",
  },
  {
    id: 14,
    name: "Помірність",
    keyword: "гармонія і баланс",
    personality:
      "Ви володієте природним чуттям гармонії й тонким душевним устроєм — вмієте знаходити баланс там, де інші бачать хаос.",
    comfort:
      "Творчість, дипломатичність і поступовість допомагають вам почуватися вцілому.",
    issue:
      "Схильність уникати крайнощів настільки, що важливі рішення відкладаються надто довго.",
  },
  {
    id: 15,
    name: "Диявол",
    keyword: "залежності та обмеження",
    personality:
      "Ви добре відчуваєте матеріальний світ і межі можливого — і бачите, де саме люди себе обмежують.",
    comfort:
      "Свобода від нав'язаних правил і залежностей — ваша справжня опора.",
    issue:
      "Схильність потрапляти у залежні стосунки чи звички, що забирають більше, ніж дають.",
  },
  {
    id: 16,
    name: "Вежа",
    keyword: "різкі зміни",
    personality:
      "Ви стійкі до криз і здатні швидко перебудуватись, коли звичний порядок руйнується.",
    comfort:
      "Внутрішня опора зростає саме після пережитих випробувань, а не завдяки уникненню їх.",
    issue:
      "Підсвідоме очікування, що «все ось-ось зруйнується», яке заважає розслабитись.",
  },
  {
    id: 17,
    name: "Зірка",
    keyword: "надія і натхнення",
    personality:
      "У вас є природний дар надихати інших і бачити перспективу навіть у складні часи.",
    comfort:
      "Віра у краще майбутнє і власні мрії — джерело вашої енергії.",
    issue:
      "Ризик втратити зв'язок із реальністю, захопившись мріями без конкретних кроків.",
  },
  {
    id: 18,
    name: "Місяць",
    keyword: "інтуїція та підсвідомість",
    personality:
      "Ви чутливі до атмосфери, настроїв і того, що приховано за словами.",
    comfort:
      "Спокій приходить через прийняття власних емоцій, без спроб їх раціоналізувати.",
    issue:
      "Схильність до тривожності й ілюзій, коли реальність підмінюється страхами.",
  },
  {
    id: 19,
    name: "Сонце",
    keyword: "радість і відкритість",
    personality:
      "Ви маєте природну щирість і здатність наповнювати радістю простір навколо себе.",
    comfort:
      "Визнання, тепле спілкування і простота у стосунках дають вам відчуття благополуччя.",
    issue:
      "Ризик уникати складних тем, аби зберегти легкість, навіть коли варто зупинитись і розібратись.",
  },
  {
    id: 20,
    name: "Суд",
    keyword: "переосмислення",
    personality:
      "Ви здатні чесно подивитись на пройдений шлях і зробити висновки, які інші намагаються уникати.",
    comfort:
      "Відчуття, що ви живете відповідно до власних цінностей, — головна умова вашого спокою.",
    issue:
      "Схильність надто суворо судити себе за минулі рішення замість того, щоб їх просто прожити.",
  },
  {
    id: 21,
    name: "Світ",
    keyword: "завершеність і цілісність",
    personality:
      "Ви прагнете довершеності в справах і вмієте зібрати розрізнені частини в єдине ціле.",
    comfort:
      "Відчуття завершеності й визнаного результату — те, що дає вам глибоке задоволення.",
    issue:
      "Складно поставити крапку і рухатись далі, поки все не здається «ідеально готовим».",
  },
  {
    id: 22,
    name: "Блазень",
    keyword: "свобода і новий досвід",
    personality:
      "Ви відкриті новому досвіду і легко починаєте з чистого аркуша, не боячись невідомого.",
    comfort:
      "Легкість, спонтанність і відсутність жорстких рамок — ваш природний стан рівноваги.",
    issue:
      "Ризик діяти необдумано і уникати відповідальності за наслідки власних рішень.",
  },
];

const ARCANA_RU: Arcana[] = [
  {
    id: 1,
    name: "Маг",
    keyword: "воля и инициатива",
    personality:
      "Вы прирождённый лидер с сильной волей — умеете начать дело и повести за собой других.",
    comfort:
      "Ваш внутренний покой зависит от ощущения контроля над собственной жизнью и пространства для действий.",
    issue:
      "Склонность брать на себя слишком много и действовать в одиночку там, где стоило бы довериться другим.",
  },
  {
    id: 2,
    name: "Жрица",
    keyword: "интуиция и внутреннее знание",
    personality:
      "Вы тонко чувствуете людей и ситуации, умеете слышать себя там, где другие полагаются только на логику.",
    comfort:
      "Покой приходит в тишине и уединении, когда есть время прислушаться к собственным ощущениям.",
    issue:
      "Склонность замалчивать свои потребности и прятаться за завесой таинственности вместо открытого разговора.",
  },
  {
    id: 3,
    name: "Императрица",
    keyword: "творчество и забота",
    personality:
      "У вас богатое воображение и природный дар создавать уют — в отношениях, доме, делах.",
    comfort: "Вы восстанавливаетесь через красоту, творчество и заботу о близких.",
    issue:
      "Риск раствориться в заботе о других и забыть о собственных творческих потребностях.",
  },
  {
    id: 4,
    name: "Император",
    keyword: "структура и ответственность",
    personality:
      "Вы умеете выстраивать порядок из хаоса и брать на себя ответственность, которой другие избегают.",
    comfort:
      "Стабильность, чёткие правила и предсказуемость — то, что даёт вам чувство опоры.",
    issue: "Излишний контроль и жёсткость там, где ситуация требует гибкости.",
  },
  {
    id: 5,
    name: "Иерофант",
    keyword: "обучение и традиции",
    personality:
      "У вас есть талант объяснять сложные вещи простыми словами и передавать опыт другим.",
    comfort:
      "Внутренний покой зависит от порядка, новых знаний и опоры на проверенные традиции.",
    issue:
      "Склонность поучать вместо того, чтобы делиться опытом с любовью и без осуждения.",
  },
  {
    id: 6,
    name: "Влюблённые",
    keyword: "выбор и искренность",
    personality:
      "Для вас важна искренность в отношениях и свобода делать собственный выбор, не оглядываясь на других.",
    comfort:
      "Гармония в близких отношениях — главный источник вашего эмоционального ресурса.",
    issue:
      "Сложности с принятием решений и страх сделать «неправильный» выбор в отношениях.",
  },
  {
    id: 7,
    name: "Колесница",
    keyword: "движение и целеустремлённость",
    personality:
      "Вы умеете мобилизоваться и двигаться к цели даже в сложных обстоятельствах.",
    comfort:
      "Вам нужно движение, перемены и ощутимый прогресс — застой истощает вас сильнее всего.",
    issue:
      "Риск конфликтов из-за излишней напористости или желания всё контролировать самостоятельно.",
  },
  {
    id: 8,
    name: "Справедливость",
    keyword: "баланс и честность",
    personality:
      "Вы цените честность и справедливость, умеете взвешенно оценивать ситуацию с разных сторон.",
    comfort:
      "Покой приходит, когда в жизни есть баланс — между работой и отдыхом, отдачей и получением.",
    issue: "Излишняя критичность к себе и другим, когда что-то кажется «несправедливым».",
  },
  {
    id: 9,
    name: "Отшельник",
    keyword: "самопознание и глубина",
    personality:
      "У вас есть склонность к глубокому анализу и способность находить ответы в одиночестве.",
    comfort: "Время наедине с собой для размышлений лучше всего восстанавливает ваши силы.",
    issue: "Риск излишней замкнутости и избегания поддержки, когда она действительно нужна.",
  },
  {
    id: 10,
    name: "Колесо Фортуны",
    keyword: "циклы и возможности",
    personality:
      "Вы умеете улавливать удачный момент и легко адаптируетесь к переменам вокруг.",
    comfort: "Доверие к потоку жизни и открытость новому дают вам чувство равновесия.",
    issue:
      "Попытки удержать контроль над тем, что естественно меняется, вызывают лишнее напряжение.",
  },
  {
    id: 11,
    name: "Сила",
    keyword: "выдержка и мягкая мощь",
    personality:
      "Ваша сила — не в давлении, а в выдержке, терпении и способности влиять мягко, но убедительно.",
    comfort:
      "Внутреннее равновесие приходит через принятие себя — без потребности что-то постоянно преодолевать.",
    issue: "Склонность сдерживать эмоции слишком долго, пока они не проявляются резким взрывом.",
  },
  {
    id: 12,
    name: "Повешенный",
    keyword: "другой взгляд",
    personality:
      "Вы способны увидеть ситуацию под непривычным углом и находить решения там, где другие останавливаются.",
    comfort:
      "Пауза, время «ничего не делать» — необходимое условие для появления нового понимания.",
    issue: "Риск застревать в ожидании «правильного момента» вместо того, чтобы действовать.",
  },
  {
    id: 13,
    name: "Смерть",
    keyword: "трансформация",
    personality: "Вы умеете отпускать отжившее и начинать новые этапы жизни без страха.",
    comfort:
      "Ощущение, что есть пространство для перемен и ничего не «застыло навсегда», даёт вам покой.",
    issue:
      "Страх перед завершением этапов жизни, который заставляет держаться за то, что уже не работает.",
  },
  {
    id: 14,
    name: "Умеренность",
    keyword: "гармония и баланс",
    personality:
      "Вы обладаете природным чувством гармонии и тонким душевным устройством — умеете находить баланс там, где другие видят хаос.",
    comfort: "Творчество, дипломатичность и постепенность помогают вам чувствовать себя целостно.",
    issue:
      "Склонность избегать крайностей настолько, что важные решения откладываются слишком надолго.",
  },
  {
    id: 15,
    name: "Дьявол",
    keyword: "зависимости и ограничения",
    personality:
      "Вы хорошо чувствуете материальный мир и границы возможного — и видите, где именно люди себя ограничивают.",
    comfort: "Свобода от навязанных правил и зависимостей — ваша настоящая опора.",
    issue:
      "Склонность попадать в зависимые отношения или привычки, которые забирают больше, чем дают.",
  },
  {
    id: 16,
    name: "Башня",
    keyword: "резкие перемены",
    personality:
      "Вы устойчивы к кризисам и способны быстро перестроиться, когда привычный порядок рушится.",
    comfort:
      "Внутренняя опора растёт именно после пережитых испытаний, а не благодаря их избеганию.",
    issue: "Подсознательное ожидание, что «всё вот-вот разрушится», которое мешает расслабиться.",
  },
  {
    id: 17,
    name: "Звезда",
    keyword: "надежда и вдохновение",
    personality:
      "У вас есть природный дар вдохновлять других и видеть перспективу даже в сложные времена.",
    comfort: "Вера в лучшее будущее и собственные мечты — источник вашей энергии.",
    issue: "Риск потерять связь с реальностью, увлёкшись мечтами без конкретных шагов.",
  },
  {
    id: 18,
    name: "Луна",
    keyword: "интуиция и подсознание",
    personality: "Вы чувствительны к атмосфере, настроениям и тому, что скрыто за словами.",
    comfort: "Покой приходит через принятие собственных эмоций, без попыток их рационализировать.",
    issue: "Склонность к тревожности и иллюзиям, когда реальность подменяется страхами.",
  },
  {
    id: 19,
    name: "Солнце",
    keyword: "радость и открытость",
    personality:
      "У вас есть природная искренность и способность наполнять радостью пространство вокруг себя.",
    comfort: "Признание, тёплое общение и простота в отношениях дают вам чувство благополучия.",
    issue:
      "Риск избегать сложных тем, чтобы сохранить лёгкость, даже когда стоит остановиться и разобраться.",
  },
  {
    id: 20,
    name: "Суд",
    keyword: "переосмысление",
    personality:
      "Вы способны честно взглянуть на пройденный путь и сделать выводы, которые другие пытаются избегать.",
    comfort:
      "Ощущение, что вы живёте в соответствии с собственными ценностями, — главное условие вашего покоя.",
    issue:
      "Склонность слишком строго судить себя за прошлые решения вместо того, чтобы их просто прожить.",
  },
  {
    id: 21,
    name: "Мир",
    keyword: "завершённость и целостность",
    personality:
      "Вы стремитесь к завершённости в делах и умеете собрать разрозненные части в единое целое.",
    comfort: "Ощущение завершённости и признанного результата даёт вам глубокое удовлетворение.",
    issue: "Сложно поставить точку и двигаться дальше, пока всё не кажется «идеально готовым».",
  },
  {
    id: 22,
    name: "Шут",
    keyword: "свобода и новый опыт",
    personality:
      "Вы открыты новому опыту и легко начинаете с чистого листа, не боясь неизвестного.",
    comfort:
      "Лёгкость, спонтанность и отсутствие жёстких рамок — ваше естественное состояние равновесия.",
    issue:
      "Риск действовать необдуманно и избегать ответственности за последствия собственных решений.",
  },
];

const ARCANA_EN: Arcana[] = [
  {
    id: 1,
    name: "The Magician",
    keyword: "will and initiative",
    personality:
      "You're a natural leader with a strong will — able to start things and bring others along.",
    comfort:
      "Your inner calm depends on feeling in control of your own life and having room to act.",
    issue:
      "A tendency to take on too much and act alone when trusting others would serve you better.",
  },
  {
    id: 2,
    name: "The High Priestess",
    keyword: "intuition and inner knowing",
    personality:
      "You sense people and situations subtly, able to hear yourself where others rely on logic alone.",
    comfort: "Calm comes in silence and solitude, when there's time to listen to your own feelings.",
    issue:
      "A tendency to keep your needs to yourself and hide behind mystery instead of open conversation.",
  },
  {
    id: 3,
    name: "The Empress",
    keyword: "creativity and care",
    personality:
      "You have a rich imagination and a natural gift for creating comfort — in relationships, at home, in your work.",
    comfort: "You recharge through beauty, creativity, and caring for those close to you.",
    issue: "The risk of dissolving into caring for others and forgetting your own creative needs.",
  },
  {
    id: 4,
    name: "The Emperor",
    keyword: "structure and responsibility",
    personality:
      "You know how to build order out of chaos and take on responsibility others avoid.",
    comfort:
      "Stability, clear rules, and predictability are what give you a sense of ground beneath your feet.",
    issue: "Excessive control and rigidity where a situation calls for flexibility.",
  },
  {
    id: 5,
    name: "The Hierophant",
    keyword: "teaching and tradition",
    personality:
      "You have a talent for explaining complex things in simple words and passing experience on to others.",
    comfort: "Inner calm depends on order, new knowledge, and reliance on tested traditions.",
    issue: "A tendency to lecture instead of sharing experience with love and without judgment.",
  },
  {
    id: 6,
    name: "The Lovers",
    keyword: "choice and sincerity",
    personality:
      "Sincerity in relationships matters to you, as does the freedom to make your own choices without looking over your shoulder.",
    comfort: "Harmony in close relationships is the main source of your emotional resource.",
    issue: "Difficulty making decisions and fear of making the 'wrong' choice in relationships.",
  },
  {
    id: 7,
    name: "The Chariot",
    keyword: "movement and drive",
    personality:
      "You know how to mobilize and move toward a goal even in difficult circumstances.",
    comfort: "You need movement, change, and tangible progress — stagnation drains you the most.",
    issue: "Risk of conflict from being too forceful or wanting to control everything yourself.",
  },
  {
    id: 8,
    name: "Justice",
    keyword: "balance and honesty",
    personality: "You value honesty and fairness, able to weigh a situation from different sides.",
    comfort: "Calm comes when life has balance — between work and rest, giving and receiving.",
    issue: "Excessive criticism of yourself and others when something feels 'unfair'.",
  },
  {
    id: 9,
    name: "The Hermit",
    keyword: "self-knowledge and depth",
    personality: "You're inclined toward deep analysis and finding answers in solitude.",
    comfort: "Time alone to reflect is what restores your strength best.",
    issue: "Risk of excessive withdrawal and avoiding support when you actually need it.",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    keyword: "cycles and opportunity",
    personality: "You know how to catch the right moment and adapt easily to change around you.",
    comfort: "Trust in the flow of life and openness to the new give you a sense of balance.",
    issue:
      "Trying to hold onto control over what naturally changes creates unnecessary tension.",
  },
  {
    id: 11,
    name: "Strength",
    keyword: "endurance and gentle power",
    personality:
      "Your strength isn't in pressure but in endurance, patience, and the ability to influence gently yet persuasively.",
    comfort:
      "Inner balance comes through accepting yourself — without needing to constantly overcome something.",
    issue: "A tendency to hold emotions in for too long, until they erupt sharply.",
  },
  {
    id: 12,
    name: "The Hanged Man",
    keyword: "a different perspective",
    personality:
      "You're able to see a situation from an unusual angle and find solutions where others stop.",
    comfort:
      "A pause, time to 'do nothing,' is a necessary condition for new understanding to emerge.",
    issue: "Risk of getting stuck waiting for the 'right moment' instead of acting.",
  },
  {
    id: 13,
    name: "Death",
    keyword: "transformation",
    personality:
      "You know how to let go of what's run its course and start new chapters of life without fear.",
    comfort:
      "The feeling that there's room for change and nothing is 'frozen forever' brings you peace.",
    issue:
      "Fear of closing chapters of life, which makes you hold on to what no longer works.",
  },
  {
    id: 14,
    name: "Temperance",
    keyword: "harmony and balance",
    personality:
      "You have a natural sense of harmony and a subtle inner disposition — able to find balance where others see chaos.",
    comfort: "Creativity, diplomacy, and taking things gradually help you feel whole.",
    issue:
      "A tendency to avoid extremes so much that important decisions get postponed for too long.",
  },
  {
    id: 15,
    name: "The Devil",
    keyword: "dependencies and limits",
    personality:
      "You have a good feel for the material world and the limits of the possible — and you see exactly where people limit themselves.",
    comfort: "Freedom from imposed rules and dependencies is your true foundation.",
    issue:
      "A tendency to fall into dependent relationships or habits that take more than they give.",
  },
  {
    id: 16,
    name: "The Tower",
    keyword: "sudden change",
    personality:
      "You're resilient in crises and able to quickly rebuild when the familiar order collapses.",
    comfort:
      "Inner strength grows precisely after trials you've been through, not from avoiding them.",
    issue:
      "A subconscious expectation that 'everything is about to fall apart,' which keeps you from relaxing.",
  },
  {
    id: 17,
    name: "The Star",
    keyword: "hope and inspiration",
    personality:
      "You have a natural gift for inspiring others and seeing a way forward even in hard times.",
    comfort: "Faith in a better future and your own dreams is your source of energy.",
    issue: "Risk of losing touch with reality, carried away by dreams without concrete steps.",
  },
  {
    id: 18,
    name: "The Moon",
    keyword: "intuition and the subconscious",
    personality: "You're sensitive to atmosphere, moods, and what's hidden behind words.",
    comfort: "Calm comes through accepting your own emotions, without trying to rationalize them.",
    issue: "A tendency toward anxiety and illusion, when reality gets replaced by fears.",
  },
  {
    id: 19,
    name: "The Sun",
    keyword: "joy and openness",
    personality:
      "You have a natural sincerity and the ability to fill the space around you with joy.",
    comfort:
      "Recognition, warm connection, and simplicity in relationships give you a sense of wellbeing.",
    issue:
      "Risk of avoiding difficult topics to keep things light, even when it's worth stopping to work through them.",
  },
  {
    id: 20,
    name: "Judgement",
    keyword: "reassessment",
    personality:
      "You're able to honestly look back at the path you've taken and draw conclusions others try to avoid.",
    comfort:
      "The feeling that you're living according to your own values is the main condition for your peace.",
    issue:
      "A tendency to judge yourself too harshly for past decisions instead of simply living them out.",
  },
  {
    id: 21,
    name: "The World",
    keyword: "completion and wholeness",
    personality:
      "You strive for completeness in your work and know how to bring scattered pieces together into a whole.",
    comfort: "A sense of completion and acknowledged results is what gives you deep satisfaction.",
    issue: "It's hard to draw a line and move on until everything seems 'perfectly ready'.",
  },
  {
    id: 22,
    name: "The Fool",
    keyword: "freedom and new experience",
    personality:
      "You're open to new experience and start easily with a clean slate, unafraid of the unknown.",
    comfort:
      "Lightness, spontaneity, and freedom from rigid rules are your natural state of balance.",
    issue:
      "Risk of acting without thinking and avoiding responsibility for the consequences of your own decisions.",
  },
];

const ARCANA_BY_LOCALE: Record<Locale, Arcana[]> = {
  uk: ARCANA_UK,
  ru: ARCANA_RU,
  en: ARCANA_EN,
};

export function getAllArcana(locale: Locale): Arcana[] {
  return ARCANA_BY_LOCALE[locale];
}

export function getArcana(id: number, locale: Locale): Arcana {
  const found = ARCANA_BY_LOCALE[locale].find((a) => a.id === id);
  if (!found) throw new Error(`Unknown arcana id: ${id}`);
  return found;
}
