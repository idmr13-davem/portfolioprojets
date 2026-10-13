(() => {
  const es = new Map(Object.entries({
    'Get in touch':'Hablemos','Selected work':'Proyectos seleccionados','My articles':'Mis artículos','Contact':'Contacto',"I'm David, a product designer":'Soy David, diseñador de producto','who ships at scale':'que crea productos a escala','7 years designing for 60 million users across Latam, from zero-to-one products to systems that moved the needle on business metrics. Currently at Mercado Libre, the largest tech company in Latin America.':'7 años diseñando para 60 millones de usuarios en Latinoamérica, desde productos creados de cero hasta sistemas que generaron impacto en métricas de negocio. Actualmente trabajo en Mercado Libre, la empresa de tecnología más grande de Latinoamérica.','8 years designing for 60M+ users across Latam — from zero-to-one products to systems that moved the needle on business metrics. Currently at Mercado Libre, the largest tech company in Latin America.':'8 años diseñando para más de 60 millones de usuarios en Latinoamérica, desde productos creados de cero hasta sistemas que generaron impacto en métricas de negocio. Actualmente trabajo en Mercado Libre, la empresa de tecnología más grande de Latinoamérica.','Scroll to see my projects':'Desliza para ver mis proyectos','Case study 1':'Caso de estudio 1','Case study 2':'Caso de estudio 2','Case study 3':'Caso de estudio 3','Continue reading →':'Continuar leyendo →','Are you ready to connect?':'¿Hablamos?','Shall we work together?':'¿Trabajamos juntos?','About':'Sobre mí','The full story':'La historia completa','01 — Career':'01 — Carrera','02 — Philosophy':'02 — Filosofía','03 — Automotive':'03 — Automotriz',"Why I've worked with 4 different teams at Mercado Libre":'Por qué he trabajado con 4 equipos diferentes en Mercado Libre','How a car cockpit changed the way I think about every screen I design':'Cómo la cabina de un auto cambió mi forma de pensar cada pantalla que diseño','Why I work in fintech but want to be in automotive':'Por qué trabajo en fintech, pero quiero estar en el sector automotriz','Thinking in business metrics':'Pensar en métricas de negocio','Expertise defines the role, not the other way around':'La experiencia define el rol, no al contrario','Everything is designed, not just the interface':'Todo se diseña, no solo la interfaz',"That's the story so far.":'Esta es la historia hasta ahora.',"Let's talk":'Hablemos','Return':'Volver','Something went wrong...':'Algo salió mal...','The page you’re looking for may have moved, changed, or never existed. Let’s get you back to the work.':'La página que buscas pudo haberse movido, cambiado o quizá nunca existió. Volvamos a los proyectos.','Go home':'Ir a la home','← All projects':'← Todos los proyectos','UX objectives':'Objetivos de UX','Objectives':'Objetivos','Our most important achievement':'Nuestro logro más importante','Context':'Contexto','Final result':'Resultado final','Thanks for reading':'Gracias por leer','Thanks for reading.':'Gracias por leer.','Thanks for reading!':'¡Gracias por leer!','Send':'Enviar','Impact':'Impacto','New flow':'Nuevo flujo','Registration in':'Registro en','Ux senior analyst / UI designer':'Analista UX senior / diseñador UI','Productive':'En producción','Visit project':'Visitar proyecto','Increase flow conversion':'Aumentar la conversión del flujo','Reduce completion time':'Reducir el tiempo de finalización','Reduced average completion time from':'Redujimos el tiempo promedio de finalización de','3 minutes and 25 seconds':'3 minutos y 25 segundos','to':'a','52 seconds':'52 segundos','Faced challenges':'Retos enfrentados','Our compounding changes':'Nuestros cambios acumulativos','1st change':'Primer cambio','2nd change':'Segundo cambio','3rd change':'Tercer cambio','4th change':'Cuarto cambio','Agnostic sign-up':'Registro agnóstico','Sign-up form':'Formulario de registro','Social sign-up with Google':'Registro social con Google','Unification':'Unificación','Enter sign-up':'Entrar a registro','Account type':'Tipo de cuenta','Add email':'Agregar correo','Add name':'Agregar nombre','Add phone':'Agregar teléfono','Add password':'Agregar contraseña','What we left on the table':'Lo que quedó pendiente','The reframe':'El replanteamiento','The risk we designed around':'El riesgo que contemplamos','Sign up with email':'Registrarse con correo','Sign up with Google':'Registrarse con Google','Sign up with phone number':'Registrarse con teléfono','Design System':'Sistema de diseño','Implemented':'Implementado','Fast':'Rápido','Medium':'Medio','Slow':'Lento','Standardize the use of motion':'Estandarizar el uso de motion','across UX and development within the User Accounts team':'entre UX y desarrollo dentro del equipo de Cuentas de Usuario','Defined the first motion foundations':'Definimos las primeras bases de motion','at Mercado Libre':'en Mercado Libre','Initial problems':'Problemas iniciales','Complete project roadmap':'Roadmap completo del proyecto','Where did we focus first?':'¿Dónde nos enfocamos primero?','How do others approach it?':'¿Cómo lo abordan otros?','What already existed internally?':'¿Qué existía internamente?','What should we define?':'¿Qué debíamos definir?','What did I contribute?':'¿Cuál fue mi aporte?','1. Research and analysis':'1. Investigación y análisis','2. Foundation definition':'2. Definición de fundamentos','3. Documentation':'3. Documentación','4. Subsystem expansion':'4. Expansión del subsistema','Motion Level concept.':'Concepto Motion Level.','Is there a rational reason to emphasize the animated element?':'¿Existe una razón racional para destacar el elemento animado?','Is the user reaching a milestone?':'¿El usuario está alcanzando un hito?','Do we want to reinforce a user action?':'¿Queremos reforzar una acción del usuario?'
  }));
  [
    ['Page not found','Página no encontrada'],
    ['Page not found,','Página no encontrada,'],
    ['the page you’re looking for may have moved or never existed, let’s go back.','la página que estás buscando pudo moverse o nunca existió, volvamos a la home.'],
    ['The page you’re looking for may have moved or never existed, let’s go back.','La página que buscas pudo haberse movido o quizá nunca existió. Volvamos al inicio.'],
    ['Page under work','Página en construcción'],
    ['This page is under work','Esta página está en construcción'],
    ['The content here isn’t available yet, please come back later.','El contenido aquí no está disponible aún, por favor vuelve después.'],
    ['Resume','Hoja de vida'],
    ['Selected work →','Mis proyectos →'],
    ['About me →','Sobre mí →'],
    ['My articles →','Mis artículos →'],
    ['Contact →','Contacto →']
  ].forEach(([source,translation])=>es.set(source,translation));
  es.set('Selected work','Mis proyectos');
  es.set('About me','Sobre mí');
  es.set('Download my CV','Descargar mi CV');
  es.set('Visit my LinkedIn profile','Visitar mi perfil de LinkedIn');
  es.set('Send me an email','Envíame un email');
  es.set('Visit my profile','Visita mi perfil');
  es.set('Send me a message','Envíame un mensaje');
  es.set('I’m David, a product designer from Colombia with a background in graphic design. I began my career in marketing agencies, working across branding, advertising, and visual design before transitioning into UX.','Soy David, diseñador de producto colombiano con formación en diseño gráfico. Comencé mi carrera en agencias de marketing, trabajando en branding, publicidad y diseño visual antes de hacer la transición hacia UX.');
  es.set('My first UX role was as a web designer, back when the discipline was still taking shape. Since then, I’ve spent eight years designing digital products across marketplaces, fintech, and B2B services. I’ve worked in startups and established companies, including nearly five years at Mercado Libre, the biggest tech company in Latam.','Mi primer rol en UX fue como diseñador web, cuando la disciplina todavía estaba tomando forma. Desde entonces, llevo ocho años diseñando productos digitales para marketplaces, fintech y servicios B2B. He trabajado en startups y empresas consolidadas, incluyendo casi cinco años en Mercado Libre, la compañía tecnológica más grande de Latinoamérica.');
  es.set('That range of experience has shaped how I approach product design: combining visual craft, business thinking, and a deep understanding of context. You can find the full timeline in my CV.','Esa variedad de experiencias ha definido mi manera de abordar el diseño de producto: combinando oficio visual, pensamiento de negocio y un entendimiento profundo del contexto. Puedes encontrar la trayectoria completa en mi CV.');
  es.set('Get in touch','Contáctame');
  es.set("I'm David, a product designer",'Soy David, product designer');
  es.set('View project','Ver proyecto');
  es.set('View project →','Ver proyecto →');
  es.set('Mercado Libre Sign-up','Registro Mercado Libre');
  es.set('Sign-up in','Registro en');
  es.set('UX senior analyst, UI designer','Analista UX senior, diseñador UI');
  es.set('My most important achievement','Mi logro más importante');
  es.set('My compounding changes','Mis cambios acumulativos');
  es.set('What I left on the table','Lo que dejé pendiente');
  es.set('The risk I designed around','El riesgo que contemplé');
  es.set('When I took ownership of this project, registration was a single shared flow for both Mercado Libre and Mercado Pago — two products with fundamentally different conversion goals.','Cuando asumí la responsabilidad de este proyecto, el registro era un único flujo compartido por Mercado Libre y Mercado Pago: dos productos con objetivos de conversión fundamentalmente distintos.');
  es.set("Mercado Pago (fintech) needed flows that met regulatory requirements for each country: strict identity verification, mandatory account type selection, KYC compliance. Mercado Libre (marketplace) needed accounts created fast enough that friction didn't kill purchase intent.",'Mercado Pago (fintech) necesitaba flujos que cumplieran los requisitos regulatorios de cada país: verificación estricta de identidad, selección obligatoria del tipo de cuenta y cumplimiento de KYC. Mercado Libre (marketplace) necesitaba crear cuentas con la rapidez suficiente para que la fricción no afectara la intención de compra.');
  es.set("The strategic decision to split the teams was the prerequisite for everything that followed. What I'm documenting here is the Mercado Libre side — four compounding changes over two years that turned a broken flow into the standard the team still ships against.",'La decisión estratégica de separar los equipos fue el punto de partida para todo lo que vino después. Aquí documento el lado de Mercado Libre, cuatro cambios acumulativos durante dos años que transformaron un flujo problemático en el estándar que el equipo continúa utilizando.');
  es.set('Create a complete new signup flow aligned with the new goal in Mercado Libre.','Crear un nuevo flujo de registro completo, alineado con el nuevo objetivo en Mercado Libre.');
  es.set('Stop being a friction in middle of purchases.','Dejar de generar fricción durante el proceso de compra.');
  es.set('Unify the different kind of signup flows in one which operate modularly.','Unificar los distintos flujos de registro en uno solo que funcionara de manera modular.');
  es.set("Mercado Libre was asking buyers to choose between \"personal\" and \"business\" accounts — a bifurcation that existed only because fintech required it for regulatory reasons. I decided to remove the account type selection from the Mercado Libre flow entirely because a buyer doesn't need to categorize themselves before purchasing on the platform. This was only possible after the teams were separated, since the same change would have violated Mercado Pago's regulatory requirements.",'Mercado Libre pedía a los compradores elegir entre una cuenta “personal” o “empresa”, una bifurcación que existía únicamente porque el producto fintech la requería por razones regulatorias. Decidí eliminar por completo la selección del tipo de cuenta del flujo de Mercado Libre porque un comprador no necesita categorizarse antes de poder comprar en la plataforma. Esto solo fue posible después de que se separaron los equipos, ya que el mismo cambio habría incumplido los requisitos regulatorios de Mercado Pago.');
  es.set('+2% conversion rate, 160,000 additional monthly registrations','+2% en la tasa de conversión, equivalente a 160.000 registros adicionales al mes');
  es.set('on 8M users/month.','sobre una base de 8 millones de usuarios al mes.');
  es.set('The existing flow was linear by design: enter a piece of data, validate it via OTP or complete an identity validation task, wait for the system, and move to the next screen; it took five steps and ten screens because the model was built around verification, not conversion. I separated declaration from validation: I brought all required fields together on a single screen and kept only the subsequent phone validation via OTP;','El flujo existente era lineal por diseño: ingresar un dato, validarlo mediante OTP o realizar una tarea de validación de identidad, esperar al sistema y avanzar a la siguiente pantalla; eran cinco pasos y diez pantallas porque el modelo estaba construido alrededor de la verificación, no de la conversión. Separé la declaración de datos de su validación: reuní todos los campos requeridos en una sola pantalla y dejé únicamente la validación posterior del teléfono mediante OTP;');
  es.set('this reduced 5 steps and 10 screens to 2 steps and 3 screens.','esto redujo 5 pasos y 10 pantallas a 2 pasos y 3 pantallas.');
  es.set('Removing step-by-step validation meant rethinking abuse control. I implemented ReCaptcha at the form level and at the OTP screen, reducing friction without losing the detection layer.','Eliminar la validación paso a paso implicó replantear el control de abuse. Implementé reCAPTCHA tanto en el formulario como en la pantalla de OTP, reduciendo la fricción sin perder la capa de detección.');
  es.set('3:25 → 1:54 completion time, 18% → 27% activation rate,','Tiempo de finalización de 3:25 a 1:54 y tasa de activación de 18% a 27%;');
  es.set('abuse dropped from 5.04% to 4.92%.','el abuse disminuyó de 5,04% a 4,92%.');
  es.set('Even with the form, users still had to manually enter their name, email, password, and phone number; this made the experience prone to errors and created friction, especially on mobile. The solution was to implement Google Identity Services: the Google button, One Tap, and Credential Manager. With a verified Google account, name and email were pre-filled, the password field was removed, and the flow was reduced to a single OTP.','Incluso con el formulario, los usuarios todavía debían ingresar manualmente su nombre, correo, contraseña y teléfono; esto hacía la experiencia propensa a errores y generaba fricción, especialmente en mobile. La solución fue implementar Google Identity Services: el botón de Google, One Tap y Credential Manager. Con una cuenta de Google verificada se completaba el nombre y el correo, se eliminaba el campo de contraseña y se reducía el flujo a un único OTP.');
  es.set('+0.6 percentage points in conversion compared with the traditional form;','+0,6 puntos porcentuales de conversión frente al formulario tradicional;');
  es.set('completion time went from 1:54 minutes to 50 seconds.','de 1:54 minutos a 50 segundos de tiempo de finalización.');
  es.set("I couldn't eliminate phone OTP because it was the only validated recovery data. With Google, the validated data point becomes email. If shipped, registration drops to ~10 seconds via One Tap.",'No pude eliminar el OTP por teléfono porque era el único dato de recuperación validado. Con Google, el correo se convierte en el dato validado. Si se implementara, el registro se reduciría a aproximadamente 10 segundos mediante One Tap.');
  es.set('As I reduced friction, drop-off rates decreased, but the problem changed. Switching between sign-up and login increased from 16% to 41.4% after social sign-up was introduced. This happened because the process was so fast and frictionless that users started it without realizing whether they were signing up or logging in.','A medida que reduje la fricción, las tasas de abandono disminuyeron, pero el problema cambió. La alternancia entre registro e inicio de sesión aumentó de 16% a 41,4% después de introducir el registro social. Esto se debía a que el proceso era tan rápido y poco friccionante que los usuarios lo iniciaban sin darse cuenta si era un registro o un login.');
  es.set("That was when I realized that the users' task is not to \"sign up\" or \"log in,\" but to access Mercado Libre. On the platform, sessions remain active for more than six months on the same device, and many users had gone so long without entering their credentials that they forgot them and ended up creating a second account because of friction or error.",'Ahí me di cuenta que la tarea de los usuarios no es “registrarse” o “iniciar sesión”, sino acceder a Mercado Libre. En la plataforma, las sesiones permanecen activas durante más de seis meses en un mismo dispositivo y muchos usuarios llevaban tanto tiempo sin ingresar sus credenciales que las olvidaban y terminaban creando una segunda cuenta por fricción o error.');
  es.set('The solution was to implement one screen that accepts an identifier (email or phone),','La solución fue implementar una única pantalla que recibe un identificador —correo o teléfono—;');
  es.set('the screen logic determines whether an account exists, and routes accordingly to sign-in or sign-up.','la lógica determina si la cuenta existe y dirige al usuario al inicio de sesión o al registro, según corresponda.');
  es.set("The user never has to decide which path they're on.",'El usuario nunca tiene que decidir en cuál de los dos caminos se encuentra.');
  es.set('Typos could route a user to the wrong flow and accidentally create a duplicate account. Solution: a persistent pill displaying the entered identifier in subsequent screens — turning a passive input into an active confirmation point.','Un error de escritura podía dirigir al usuario al flujo equivocado y crear accidentalmente una cuenta duplicada. La solución fue mantener visible el identificador ingresado mediante un pill persistente en las pantallas siguientes, convirtiendo un dato pasivo en un punto activo de confirmación.');
  es.set('Sign up with email','Registro con correo');
  es.set('Sign up with Google','Registro con Google');
  es.set('Sign up with phone number','Registro con teléfono');
  es.set('These are some of the figures achieved as a result of the implemented iterations:','Estos son algunos de los números alcanzados como resultado de las iteraciones implementadas:');
  es.set('I reduced completion time from 3:25 minutes with the initial flow to 50 seconds with social sign-up','Reduje el tiempo de finalización, de 3:25 minutos con el flujo inicial a 50 segundos con el registro social');
  es.set('through the changes accumulated over the two years I worked on this project.','con los cambios acumulados de los 2 años en que trabajé en este proyecto.');
  es.set('I increased flow conversion by 12.5% and added 180,000 new users per month','Aumenté la conversión del flujo en 12,5% y sumé 180.000 usuarios nuevos al mes');
  es.set('when unification was implemented in specific sites, such as Brazil. This conversion also affected the other countries where it was implemented, with smaller figures close to 100,000 users.','cuando la unificación se implementó en sitios específicos, como Brasil. Esta conversión también afectó los otros países donde se implementó con cifras menores cercanas a los 100.000 usuarios.');
  es.set("Feedback is one of the most important pillars of growth. If you've worked on something similar — what would you have done differently? I'd genuinely love to hear it.",'El feedback es uno de los pilares más importantes para crecer. Si has trabajado en algo similar, ¿qué habrías hecho diferente? Me encantaría conocer tu perspectiva.');
  es.set('Role: Senior UX analyst / Product Designer','Rol: Analista UX senior / Product Designer');
  es.set('I worked on this project for two years across nine Latin American countries, reducing sign-up friction and completion time for Mercado Libre, the Amazon of Latin America.','Trabajé durante 2 años en este proyecto para 9 países de Latam bajo el objetivo de reducir la fricción y el tiempo de registro para entrar al marketplace más grande de la región.');
  es.set('Key impact:','Hitos logrados:');
  es.set('Average signup time fell from 3:25 minutes to 52 seconds, while conversion increased by more than 10%, depending on the country.','Se redujo el tiempo promedio de registro de 3:25 minutos a 52 segundos y aumentó la conversión más de 10% según el país.');
  es.set('Motion Design System','Sistema de Motion Design');
  es.set('across UX and development within the User Accounts team','entre UX y desarrollo dentro del equipo de Cuentas de Usuario');
  es.set("For years, Mercado Libre — one of Latin America's largest technology ecosystems — had not focused on building motion experiences internally. A small number of motion designers handled custom animation requests on demand, while most experiences relied on basic standards such as screen transitions and the easing and duration values embedded in components like bottom sheets and snackbars.",'Durante años, Mercado Libre —uno de los ecosistemas tecnológicos más grandes de Latinoamérica— no se había enfocado en desarrollar internamente experiencias de motion. Un pequeño grupo de motion designers atendía solicitudes de animaciones personalizadas bajo demanda, mientras que la mayoría de las experiencias dependía de estándares básicos, como transiciones de pantalla y valores de easing y duración integrados en componentes como bottom sheets y snackbars.');
  es.set("I joined the project as an interaction analyst. My objective was to research the concepts, criteria, and practices that could become the foundation of a future system. I contributed for nine months before handing the work over to Mercado Libre's first dedicated motion design team, providing the initial groundwork for what later became its motion design system.",'Me sumé al proyecto como analista de interacción. Mi objetivo era investigar los conceptos, criterios y prácticas que podrían convertirse en la base de un sistema futuro. Contribuí durante nueve meses antes de transferir el trabajo al primer equipo de motion design dedicado de Mercado Libre, aportando las bases iniciales de lo que posteriormente se convirtió en su sistema de motion design.');
  es.set('Only a few components had standardized animation behavior—for example, all bottom sheets used the same easing and duration.','Solo algunos componentes tenían un comportamiento de animación estandarizado; por ejemplo, todos los bottom sheets utilizaban el mismo easing y duración.');
  es.set('The system did not define when motion should be used according to the experience objective; each team relied on individual judgment.','El sistema no definía cuándo utilizar motion según el objetivo de la experiencia; cada equipo dependía del criterio individual.');
  es.set('Teams had no shared methodology for delivering projects that required custom motion.','Los equipos no contaban con una metodología compartida para entregar proyectos que requerían motion personalizado.');
  es.set('Motion designers were scarce—initially about one for every 80 designers—which created a bottleneck.','Había pocos motion designers: inicialmente, cerca de uno por cada 80 diseñadores, lo que generaba un cuello de botella.');
  es.set('Motion designers were focused on delivery, leaving little capacity to define and build the system itself.','Los motion designers estaban enfocados en delivery, lo que dejaba poca capacidad para definir y construir el sistema.');
  es.set('In short, the internal problem was a lack of clarity, consistency, and collective criteria for using motion.','En síntesis, el problema interno era la falta de claridad, consistencia y criterios colectivos para utilizar motion.');
  es.set('The initial stage followed four steps distributed across three analysts, two UX designers, and one motion designer who joined during phase two.','La etapa inicial siguió cuatro pasos, distribuidos entre tres analistas, dos diseñadores UX y un motion designer que se incorporó durante la segunda fase.');
  es.set('We studied systems including Material Design, Human Interface Guidelines, Carbon, Spectrum, and Fluent.','Estudiamos sistemas como Material Design, Human Interface Guidelines, Carbon, Spectrum y Fluent.');
  es.set('We reviewed custom animations at Mercado Libre to understand their process, tools, and most persistent execution and handoff frictions.','Revisamos animaciones personalizadas de Mercado Libre para comprender su proceso, sus herramientas y las fricciones más persistentes durante la ejecución y el handoff.');
  es.set('We looked for references that could help us establish a repeatable process for creating a motion design system.','Buscamos referencias que nos ayudaran a establecer un proceso repetible para crear un motion design system.');
  es.set('Left: comparison of motion pillars, easing, duration, granularity, and extensibility across design systems. Right: books, articles, and websites documenting how other organizations established internal motion practices.','Izquierda: comparación de motion pillars, easing, duración, granularidad y extensibilidad entre distintos design systems. Derecha: libros, artículos y sitios web que documentan cómo otras organizaciones establecieron prácticas internas de motion.');
  es.set('Internal research into custom animations at Mercado Libre. We compared shared patterns and differences to define a more efficient future workflow.','Investigación interna sobre animaciones personalizadas en Mercado Libre. Comparamos patrones compartidos y diferencias para definir un workflow futuro más eficiente.');
  es.set("I defined the process used to create the roadmap, drawing from Val Head's",'Definí el proceso utilizado para crear el roadmap a partir del libro de Val Head');
  es.set('. The book gave us a practical route for taking the first steps toward a motion design system.','. El libro nos proporcionó una ruta práctica para dar los primeros pasos hacia un motion design system.');
  es.set('I researched leading motion design systems—including Material Design, Human Interface Guidelines, Adobe Spectrum, and Carbon—then aligned their commonalities and differences to define both an MVP and a more ambitious future state.','Investigué motion design systems de referencia —incluidos Material Design, Human Interface Guidelines, Adobe Spectrum y Carbon— y luego alineé sus puntos en común y diferencias para definir tanto un MVP como un estado futuro más ambicioso.');
  es.set('I investigated how UX and motion designers at Mercado Libre had created custom animations: the tools they used, their execution and handoff processes, and the frictions they encountered when aligning with development.','Investigué cómo los diseñadores de UX y motion de Mercado Libre habían creado animaciones personalizadas: las herramientas que utilizaban, sus procesos de ejecución y handoff, y las fricciones que encontraban al alinearse con desarrollo.');
  es.set('I created and developed','Creé y desarrollé');
  es.set(": a shared standard for deciding what type of animation to create based on the UX objective, flow frequency, and the user's journey.",': un estándar compartido para decidir qué tipo de animación crear según el objetivo de UX, la frecuencia del flujo y el journey del usuario.');
  es.set('This diagram was the first definition of Motion Level. It placed an animation on a horizontal axis between functional and expressive, using four criteria to position a motion proposal according to the flow where it would be integrated.','Este diagrama fue la primera definición de Motion Level. Ubicaba una animación sobre un eje horizontal entre lo funcional y lo expresivo, utilizando cuatro criterios para posicionar una propuesta de motion según el flujo en el que se integraría.');
  es.set("How repetitive is the task within the user's journey?",'¿Qué tan repetitiva es la tarea dentro del journey del usuario?');
  es.set('This could be hierarchy, scannability, or another functional reason.','Puede ser por jerarquía, escaneabilidad u otra razón funcional.');
  es.set('Less repetitive tasks are more memorable and can use motion as an expressive tool.','Las tareas menos repetitivas son más memorables y pueden utilizar motion como una herramienta expresiva.');
  es.set("More expressive motion can represent a celebration or achievement that happens only a few times—or once—in the user's journey.",'Un motion más expresivo puede representar una celebración o un logro que ocurre pocas veces —o una sola vez— dentro del journey del usuario.');
  es.set("Motion becomes the brand's voice at its most expressive. We use it when we want to reinforce a behavior, as Duolingo does when someone completes a lesson.",'Motion se convierte en la voz de la marca en su expresión más intensa. Lo utilizamos cuando queremos reforzar un comportamiento, como hace Duolingo cuando una persona completa una lección.');
  es.set("After contributing to the project for nine months, I handed the research, framework, and documentation over to Mercado Libre's dedicated motion design team. The work continued evolving after my involvement and became part of the motion foundations currently used across the organization.",'Después de contribuir al proyecto durante nueve meses, transferí la investigación, el framework y la documentación al equipo dedicado de motion design de Mercado Libre. El trabajo continuó evolucionando después de mi participación y pasó a formar parte de los fundamentos de motion que actualmente utiliza la organización.');
  es.set('My contribution was not the final system itself, but the early research and shared decision-making framework that helped the team move from isolated animation practices toward a more consistent approach to motion.','Mi aporte no fue el sistema final, sino la investigación inicial y el framework compartido para tomar decisiones, que ayudaron al equipo a pasar de prácticas de animación aisladas a un enfoque de motion más consistente.');
  es.set("Feedback is one of the most important pillars of learning. If you had owned this project, what would you have done differently? I'd genuinely love to hear your perspective.",'El feedback es uno de los pilares más importantes del aprendizaje. Si hubieras estado a cargo de este proyecto, ¿qué habrías hecho diferente? Me encantaría conocer tu perspectiva.');
  es.set('Role: Senior UI Designer / Researcher','Rol: Diseñador UI senior / investigador');
  es.set('I contributed to the early foundations of the motion design system at Mercado Libre, Latin America’s largest technology ecosystem, as part of a multidisciplinary UX and motion team supporting more than 80 designers and 700 developers.','Contribuí a las primeras bases del sistema de motion design de Mercado Libre, el ecosistema tecnológico más grande de Latinoamérica, como parte de un equipo multidisciplinario de UX y motion que apoyaba a más de 80 diseñadores y 700 desarrolladores.');
  es.set('Main contribution:','Aporte principal:');
  es.set('I created the initial Motion Level concept, a framework for defining how functional or expressive an animation should be according to its context.','Creé el concepto inicial de Motion Level, un framework para definir qué tan funcional o expresiva debe ser una animación según su contexto.');
  es.set("Design isn't just a job, it's a passion I see in details every day.",'El diseño no es solo un trabajo; es una pasión que encuentro cada día en los detalles.');
  es.set("Why Mercado Libre Was the First Place I Didn't Want to Leave",'¿Por qué Mercado Libre fue el primer lugar del que no quise irme?');
  es.set('A reflection on professional growth, internal rotation, and how to find an environment that keeps challenging you.','Una reflexión sobre crecimiento profesional, rotación interna y cómo encontrar un entorno que siga retándote.');
  es.set('A couple of years ago, an interviewer asked me: why have you stayed so long at the same…','Hace un par de años, durante una entrevista me preguntaron: ¿por qué has permanecido tanto tiempo en la misma…');
  es.set('A bad interface not only creates a bad experience, it could be much worse','Una mala interfaz no solo crea una mala experiencia: puede ser mucho peor');
  es.set("I'm not only a designer who likes to create interfaces, I'm also a passionate of UX automotive…",'Además de diseñar interfaces, me apasiona la UX automotriz…');
  es.set("What I've learned from my other passion, music, about a good experience",'Lo que mi otra pasión, la música, me enseñó sobre una buena experiencia');
  es.set('When I was a teenager I used to practice guitar, and also…','Cuando era adolescente, practicaba guitarra y también…');
  es.set("I'm looking for a place where the drive to challenge myself, grow, and solve problems I'm passionate about is just part of the job.",'Busco un lugar donde desafiarme, crecer y resolver problemas que me apasionan sea parte natural del trabajo.');
  es.set('Website created with','Sitio web creado con');
  // About — complete long-form story translation.
  es.set('Some things that shaped how I think about design.','Algunas experiencias que moldearon mi forma de pensar sobre el diseño.');
  es.set("Each one started with a question I didn't expect.",'Cada una comenzó con una pregunta que no esperaba.');
  es.set('A couple of years ago, an interviewer asked me:','Hace un par de años, durante una entrevista me preguntaron:');
  es.set('why have you stayed so long at the same company?','¿por qué has permanecido tanto tiempo en la misma empresa?');
  es.set('It caught me off guard. But the question stuck with me — and what I found when I sat with it became this article.','La pregunta me tomó por sorpresa, pero se quedó conmigo. Lo que descubrí al reflexionar sobre ella se convirtió en este artículo.');
  es.set("Early in my career I changed jobs fast. What I didn't understand then was why: every time I stopped feeling like I was growing, the motivation disappeared.",'Al inicio de mi carrera cambiaba de trabajo con rapidez. En ese momento no entendía por qué: cada vez que dejaba de sentir que estaba creciendo, la motivación desaparecía.');
  es.set("I wasn't unstable. I was chasing learning.",'No era inestabilidad. Estaba buscando aprender.');
  es.set("Mercado Libre was the first place where that didn't happen. The largest, most experienced UX team I'd ever seen. Colleagues so sharp they made me feel like I'd just graduated. And with dozens of teams and projects, there was a real option I hadn't had before: rotate internally instead of leaving.",'Mercado Libre fue el primer lugar donde eso no ocurrió. Era el equipo de UX más grande y experimentado que había conocido. Tenía colegas tan brillantes que me hacían sentir como si acabara de graduarme. Y, con decenas de equipos y proyectos, apareció una posibilidad que nunca había tenido: moverme internamente en lugar de irme.');
  es.set('I did it four times. These are the four things I took from it.','Lo hice cuatro veces. Estos son los cuatro aprendizajes que me llevé.');
  es.set('Maturing as a designer means stopping to evaluate your work only by how it looks — and starting to ask what it moves. What evidence of impact do we have? How do we know we achieved what we set out to achieve?','Madurar como diseñador implica dejar de evaluar el trabajo solo por cómo se ve y comenzar a preguntar qué cambia. ¿Qué evidencia de impacto tenemos? ¿Cómo sabemos que logramos lo que nos propusimos?');
  es.set("For years I was obsessed with promotion. What I eventually understood is that comparing your path to someone else's is a dead end. I learned to separate a referent — someone who inspires you — from a role model — someone you're trying to imitate. They're not the same thing.",'Durante años estuve obsesionado con ascender. Con el tiempo entendí que comparar mi camino con el de otra persona no llevaba a ninguna parte. Aprendí a distinguir entre un referente —alguien que te inspira— y un modelo a seguir —alguien a quien intentas imitar—. No son lo mismo.');
  es.set('Ownership','Responsabilidad');
  es.set("The shift from waiting to be told what to do — to detecting problems and proposing solutions without being asked. Seniority isn't just skill level. It's initiative.",'El cambio fue pasar de esperar instrucciones a detectar problemas y proponer soluciones sin que nadie lo pidiera. El seniority no es solo un nivel de habilidad. También es iniciativa.');
  es.set("My instinct was always to jump to deliverables: UI, final copy. What I had to learn is that the craft between the first idea and the final output is where the real difference lives. Mediocre and outstanding don't look that different in a brief — they look completely different in execution.",'Mi instinto siempre fue saltar directamente a los entregables: la UI y el copy final. Tuve que aprender que el oficio entre la primera idea y el resultado final es donde vive la verdadera diferencia. Lo mediocre y lo sobresaliente no parecen tan distintos en un brief, pero se ven completamente diferentes en la ejecución.');
  es.set("Each of these came from a different leader, in a different context. That's the point: staying comfortable in one place for too long doesn't just slow your growth — it limits what you're exposed to.",'Cada aprendizaje vino de un líder diferente y en un contexto distinto. Ese es el punto: permanecer demasiado tiempo en un lugar cómodo no solo ralentiza tu crecimiento, también limita las experiencias a las que te expones.');
  es.set("I studied graphic design, so for a long time I thought design was limited to the visual layer: the colors, the composition, how things look. That's not wrong — but it's an incomplete view I didn't fully understand until much later.",'Estudié diseño gráfico, así que durante mucho tiempo pensé que el diseño se limitaba a la capa visual: los colores, la composición y la apariencia. No es una idea equivocada, pero sí incompleta; tardé años en comprenderlo.');
  es.set("I'm a big fan of automotive design, and one day while driving I started thinking about my car's cockpit. The question that came to me was: how does a driver interact with an infotainment system at 120 km/h? A poorly placed button, a screen that takes half a second too long to respond, ambiguous information on a critical action — the consequences can be far worse than a \"bad experience.\"",'Me apasiona el diseño automotriz y, un día mientras conducía, comencé a pensar en la cabina de mi auto. Me pregunté: ¿cómo interactúa una persona con un sistema de infoentretenimiento a 120 km/h? Un botón mal ubicado, una pantalla que tarda medio segundo de más en responder o información ambigua durante una acción crítica pueden tener consecuencias mucho peores que una “mala experiencia”.');
  es.set("At that speed, that's not a bad UX moment. It's a car accident.",'A esa velocidad, no es un mal momento de UX. Es un accidente de tránsito.');
  es.set("After that, I couldn't look at any screen the same way. A registration form, a payment flow, a settings menu — every screen has consequences. Someone's time, trust, and frustration are always on the line. The stakes vary by context, but they never disappear.",'Después de eso no pude volver a mirar una pantalla de la misma manera. Un formulario de registro, un flujo de pago o un menú de configuración: cada pantalla tiene consecuencias. Siempre están en juego el tiempo, la confianza y la frustración de alguien. Lo que está en riesgo cambia según el contexto, pero nunca desaparece.');
  es.set("That's when I stopped thinking of myself as an interface designer and started thinking of myself as an experience designer. The distinction matters more than it sounds.",'Fue entonces cuando dejé de verme como diseñador de interfaces y comencé a pensar en mí como diseñador de experiencias. La diferencia importa más de lo que parece.');
  es.set('My principle shifted from "design for the user" — the standard HCD framing — to something more precise: design for the context. Context means the user, the business, and the technical capacity together. The full triad. Products that only optimize for one of the three tend to fail the other two.','Mi principio pasó de “diseñar para el usuario” —el enfoque tradicional del diseño centrado en las personas— a algo más preciso: diseñar para el contexto. El contexto reúne al usuario, el negocio y la capacidad técnica. La tríada completa. Los productos que optimizan solo uno de estos aspectos suelen fallar en los otros dos.');
  es.set("The cockpit question made that obvious. You can't design a great in-car interface thinking only about the person, or only about the engineering. You need all three at once.",'La pregunta sobre la cabina lo hizo evidente. No se puede diseñar una gran interfaz para un vehículo pensando únicamente en la persona o únicamente en la ingeniería. Se necesitan los tres aspectos al mismo tiempo.');
  es.set("I've been passionate about cars for as long as I can remember — not just as objects, but as systems. The way a well-designed interior communicates before you even touch it. The different feel of a gear shift depending on whether it was designed to be precise or expressive. That kind of attention to physical experience is what got me interested in design in the first place.",'Los autos me apasionan desde que tengo memoria, no solo como objetos, sino como sistemas. Me interesa cómo un interior bien diseñado comunica antes de tocarlo y cómo una palanca de cambios se siente diferente según haya sido diseñada para ser precisa o expresiva. Esa atención a la experiencia física fue lo que despertó inicialmente mi interés por el diseño.');
  es.set("It took me a while to realize this wasn't separate from my professional interest — it was pointing directly at it. User experience in the automotive sector is where experience design gets genuinely hard, but also genuinely memorable.",'Tardé en entender que esto no estaba separado de mi interés profesional: apuntaba directamente hacia él. En el sector automotriz, diseñar experiencias se vuelve genuinamente difícil, pero también verdaderamente memorable.');
  es.set("In automotive UX, attention isn't just a limited resource — it's a critical one.",'En UX automotriz, la atención no es solo un recurso limitado: es un recurso crítico.');
  es.set("Every interaction has to work within a fraction of a second of cognitive load, in varying light conditions, sometimes with only one hand available. The constraints are extreme. And extreme constraints, when taken seriously, produce better design thinking than comfortable ones. In my early career I worked on a UX project in mobility called Puntomóvil — a luxury marketplace for white-label mobility apps in Bogotá. One of the initial challenges was how to optimize the interface to facilitate interaction considering Fitts' Law. A simple example of how context shapes design.",'Cada interacción debe funcionar con una fracción de segundo de carga cognitiva, bajo condiciones de luz variables y, a veces, con una sola mano disponible. Las restricciones son extremas y, cuando se toman en serio, producen un pensamiento de diseño más sólido que las condiciones cómodas. Al inicio de mi carrera trabajé en Puntomóvil, un proyecto de UX para un marketplace de aplicaciones de movilidad white-label en Bogotá. Uno de los primeros retos fue optimizar la interfaz para facilitar la interacción aplicando la ley de Fitts: un ejemplo sencillo de cómo el contexto moldea el diseño.');
  es.set("The challenge that excites me most about the coming years in this sector is how to reconcile autonomous driving with the joy of driving — and how companies like Tesla, Waymo, and others developing this technology will balance that tension. They're not designing a vehicle. They're designing the future of mobility: autonomous driving, connected ecosystems, a fundamental shift in what transportation means.",'El reto que más me entusiasma para los próximos años es cómo reconciliar la conducción autónoma con el placer de conducir y cómo empresas como Tesla, Waymo y otras que desarrollan esta tecnología equilibrarán esa tensión. No están diseñando un vehículo: están diseñando el futuro de la movilidad, con conducción autónoma, ecosistemas conectados y un cambio fundamental en lo que significa transportarse.');
  es.set("As someone who considers driving a pleasure — not a task to be optimized — I'm fascinated by the tension this creates. What does it mean to be in the cockpit when there's no one at the wheel? What does it feel like to be in a self-driving car for someone who didn't want it to drive itself?",'Como alguien que considera conducir un placer —no una tarea que deba optimizarse—, me fascina la tensión que esto genera. ¿Qué significa estar en la cabina cuando nadie lleva el volante? ¿Cómo se siente viajar en un auto autónomo para alguien que no quería que condujera por sí mismo?');
  es.set("Nobody has fully answered that question yet. These are precisely the experience challenges I'd like to work on.",'Nadie ha respondido por completo esa pregunta. Estos son precisamente los retos de experiencia en los que quiero trabajar.');
  es.set('If something here sparked a question,','Si algo de esta historia despertó una pregunta,');
  es.set("that's exactly the point.",'ese era exactamente el propósito.');

  // Mercado Libre article — preserve the original Spanish text and paragraph structure.
  es.set("6 min read", "6 minutos de lectura");
  es.set("August 1, 2026", "1 de Agosto de 2026");
  es.set("English and Spanish", "Inglés y Español");
  es.set("Photos from my visit to Mercado Libre’s offices in Buenos Aires, Argentina, in 2024.", "Fotografías de mi visita a las oficinas de Mercado Libre en Buenos Aires, Argentina, durante 2024.");
  es.set("A couple of years ago, during a job interview, I was asked an unexpected question: why have you stayed at the same company for so long? It caught me off guard, but the question stayed with me. What I discovered as I reflected on it became this article.", "Hace un par de años, durante una entrevista de trabajo, recibí una pregunta inesperada: ¿por qué has permanecido tanto tiempo en la misma empresa? La pregunta me tomó por sorpresa, pero se quedó conmigo. Lo que descubrí al reflexionar sobre ella se convirtió en este artículo.");
  es.set("Early in my career, I changed jobs quickly. I would start with sky-high motivation, and as I got to know the ins and outs of each company, I would get caught up in a cycle of learning about the business and its approach that, after a couple of months, felt like it was draining my energy.", "Al inicio de mi carrera cambiaba de trabajo con rapidez. Empezaba con una motivación demasiado alta y, a medida que iba conociendo el detalle de cada empresa, me envolvía en una espiral de aprendizaje del negocio y del enfoque que, después de un par de meses, sentía que me drenaba la energía.");
  es.set("Eventually, after a little over a year at a company, my energy would be so depleted that I would start looking for new opportunities again. In three years, I worked at three different companies in Colombia’s startup ecosystem, on projects ranging from video game design and on-demand interface design for Colombian clients to designing an MVP for the first marketplace for Venezuelan families, where relatives abroad could pay for groceries in dollars and have them delivered to their families’ homes. A preview of my future experience at Mercado Libre.", "Al final, después de algo más de un año trabajando en varias empresas, mi energía se había agotado tanto que salía de nuevo a la búsqueda de nuevas oportunidades laborales. En tres años pasé por tres empresas diferentes dentro del ecosistema de startups en Colombia, trabajando en proyectos que iban desde el diseño de videojuegos, pasando por diseño de interfaces on demand para clientes colombianos, hasta el diseño de un MVP del primer marketplace para familias venezolanas, donde sus familiares en el exterior compraban el mercado pagando en dólares y enviaban las compras a domicilio. Un preámbulo de mi futura experiencia en Mercado Libre.");
  es.set("After that experience, I joined Mercado Libre in 2021, and much of my approach changed.", "Después de esta experiencia entré a Mercado Libre en 2021 y gran parte de mi enfoque cambió.");
  es.set("Unlike anywhere I had worked before, Mercado Libre was the first place where I found myself in a huge environment, surrounded by hundreds of designers. Many were among the most brilliant people I had ever met in my career. It was also a place where design was mature enough to give the profession the recognition it deserved, treating it as more than the ability to make screens look good, which is where so many of us start our careers.", "A diferencia de otros lugares donde trabajé antes, en Mercado Libre me encontré por primera vez en un entorno gigante donde no solamente estaba rodeado de cientos de diseñadores, muchos de ellos personas tan brillantes que nunca antes me había cruzado en mi trayectoria profesional, sino donde también la madurez del diseño le daba la importancia necesaria a la profesión para considerarla algo más que la habilidad de embellecer pantallas, con la que muchos iniciamos nuestra trayectoria profesional.");
  es.set("This is where my professional growth expanded beyond the visual craft that had occupied so much of my time studying graphic design. In this environment, I learned about:", "Es aquí donde mi crecimiento profesional se expandió a más campos fuera del craft visual que tanto había ocupado mis años de estudio como diseñador gráfico. En este entorno aprendí de:");
  es.set("Design and its direct relationship with strategy.", "El diseño y su relación directa con la estrategia.");
  es.set("Clearly defining goals for the user experience.", "La definición clara de objetivos de experiencia hacia el usuario.");
  es.set("Qualitative and quantitative research as the foundation for understanding a problem and proposing a solution.", "La investigación, cualitativa y cuantitativa, como base del entendimiento de un problema y el planteamiento de una solución.");
  es.set("Framing the problem as the starting point for any project.", "La definición de un problem framing como punto de partida de cualquier proyecto.");
  es.set("Storytelling and a story-first approach, where the UI is designed around the story, rather than the other way around.", "El storytelling y un enfoque story first, donde la UI se diseña alrededor de la historia y no al revés.");
  es.set("The importance of metrics in products used at scale, where even the smallest changes can create friction that leads to financial losses for the business.", "La importancia de las métricas en productos masivos, donde cambios mínimos pueden significar fricciones con pérdidas financieras para el negocio.");
  es.set("The value of a culture built around giving and receiving feedback on details that often go unnoticed.", "Los aportes de una cultura intensiva en dar y recibir feedback sobre detalles que muchas veces son invisibles para el ojo.");
  es.set("There is a lot I could take away from my five years at this company, but I wanted to distill it into four key lessons. These are the lessons I’m taking with me after working across four teams and projects within the company.", "Hay muchos aprendizajes que podría extraer de mis 5 años en esta compañía, pero he querido sintetizarlos en 4 aprendizajes clave. Son las enseñanzas que me llevo después de haber pasado ya por 4 equipos y proyectos dentro de la compañía.");
  es.set("Lesson #1: Design is not an end in itself; it serves a larger purpose", "Aprendizaje #1: El diseño no es un fin en sí mismo, está al servicio de algo más");
  es.set("Before Mercado Libre, my mindset was that design was an end in itself. That is a common mistake among junior designers, and it is easy to spot in their work.", "Mi mindset anterior a Mercado Libre era que el diseño es un fin en sí mismo, y ese es un error común de los diseñadores junior que es fácilmente perceptible al mirar su trabajo.");
  es.set("How many times have you seen a portfolio where a designer says “I created this app,” followed by a bunch of mockups showing how beautiful and polished the interface is? Maybe you’re one of them, and there’s nothing wrong with admitting it. I was one of them many years ago.", "¿Cuántas veces has visto un portafolio donde un diseñador dice creé esta aplicación, seguido de un montón de mockups de lo linda y pulida que es su interfaz? Quizá eres uno de ellos y no está mal admitirlo. Yo fui uno de ellos hace ya muchos años.");
  es.set("The lesson is that a design should not be judged solely by its level of craft and attention to detail, but by the results it brings to the business. And how can you know the impact your design has on the business if you don’t understand the business or how its success is measured?", "La enseñanza final es que un diseño no debe juzgarse únicamente por su alto nivel de craft y enfoque en el detalle, sino por los resultados que trae al negocio. ¿Y cómo vas a saber el impacto que tu diseño trae al negocio si no entiendes el negocio y no sabes cómo se mide su éxito?");
  es.set("Lesson #2: Experience adapted to context defines seniority, not a list of requirements", "Aprendizaje #2: La experiencia adaptada al contexto define el seniority, no una lista de requisitos");
  es.set("For years, including my early days at Mercado Libre, I was obsessed with professional growth. I was always looking for something more to do, to learn, and to improve.", "Durante años, y también en las primeras etapas de mi experiencia laboral en Mercado Libre, fui un obsesionado con el crecimiento profesional. Siempre estaba buscando algo más por hacer, por aprender y por mejorar.");
  es.set("Along the way, I also met people who were pursuing growth for the wrong reasons. The question that kept coming up was: what am I missing to become a senior designer? Almost as if reaching a certain level of seniority meant checking off years of experience and knowledge acquired.", "Y así también me crucé con personas que perseguían el desarrollo con el fin equivocado. La pregunta que se repetía era: ¿qué me falta para ser senior? Casi como si lograr un seniority fuera completar un checklist de años de experiencia y conocimientos adquiridos.");
  es.set("The truth is, it doesn’t work that way. People reached high levels of seniority at very different stages of their lives, at different ages, in different contexts, and at different points in their development as designers. Today, I can tell you that the skills of a senior designer in 2020 are nowhere near the same as those of a senior designer in 2026.", "La verdad es que no es así; tanto así, que había personas que alcanzaban un alto nivel de seniority en etapas muy diferentes de su vida, edad, contexto y evolución dentro de la disciplina. Hoy en día te aseguro que un senior en 2020 no tiene ni de cerca las mismas skills que un senior en 2026.");
  es.set("Lesson #3: Ownership is the extra mile that sets you apart", "Aprendizaje #3: El ownership es la milla extra que te diferencia de los demás");
  es.set("It’s common for people to do what they’re asked without thinking about the best version of a product.", "Es una actitud común en muchas personas hacer lo que se les pide sin pensar en la mejor versión de un producto.");
  es.set("Have you ever looked at a product and thought, “I’d change this if I could”? Being a product designer and looking at the experiences around you is like being a chef and trying dishes at a new restaurant every week. You’re bound to find things that catch your attention, things you don’t like, things that feel new, and things you can bring into your own work.", "¿No te ha pasado que has visto un producto y has pensado yo le cambiaría esto si pudiera? Ser diseñador de producto y ver experiencias a tu alrededor es como ser un chef y degustar platos de un nuevo restaurante cada semana. Seguro encontrarás cosas que te llamarán la atención, que no te gustarán, que te parecerán novedosas y que podrás traer a tu trabajo.");
  es.set("That extra mile is what sets an excellent designer apart from an average one, and you can find inspiration anywhere.", "Esa milla extra diferencia a un diseñador común de uno excelente, y la inspiración puedes encontrarla en cualquier parte.");
  es.set("Lesson #4: Design goes beyond the visual; every part of an experience is designed, consciously or unconsciously", "Aprendizaje #4: El diseño no solo es visual y cada factor de una experiencia se diseña, de forma consciente o inconsciente");
  es.set("This was perhaps my most painful lesson, coming from a background in graphic design. To me, design used to mean the interface and attention to detail, but I soon realized that was only one part of it.", "Este es quizá mi aprendizaje más doloroso, viniendo de un background en diseño gráfico. Para mí, el diseño antes era la interfaz y el enfoque en el detalle, pero pronto entendí que esa es solo una parte del diseño.");
  es.set("The story, the words, the user journey, and the context of use are just as important as the interface itself, if not more so. To be a good product or UX designer, you need more than strong craft. You also need to be good at communicating ideas and telling stories, a skill that many of us who come from graphic design overlook.", "La historia, las palabras, el journey del usuario y el contexto de uso son tan o más importantes que la misma interfaz. Para ser un buen diseñador de producto o UX no solamente debes ser bueno en el craft, también debes ser bueno comunicando ideas y contando historias, una habilidad que muchos de los que venimos del mundo del diseño gráfico ignoramos.");
  es.set("These are four of the lessons I’ve learned during my time at Mercado Libre, beyond hard skills such as using AI, learning motion design, conducting research, and other skills typical of the profession.", "Estos son cuatro de los aprendizajes que he tenido en mi trayectoria en Mercado Libre, fuera de hard skills como el uso de IA, aprendizaje en motion, ejecución de research y otras skills típicas de la profesión.");
  es.set("Today, I understand that staying in one place doesn’t always mean standing still; sometimes it means finding an environment where the challenge changes before you have to go looking for it elsewhere", "Hoy entiendo que permanecer en un lugar no siempre significa quedarse quieto; a veces significa encontrar un entorno donde el reto cambia antes de que tengas que salir a buscarlo afuera");
  es.set("Do you agree with this reflection? What stood out to you? Is there anything you’d like to discuss with me?", "¿Estás de acuerdo con esta reflexión? ¿Qué parte te llamó la atención? ¿Hay algo que te gustaría discutir conmigo?");
  es.set("I’d love to read your thoughts. And if you’d like to get in touch about a new job opportunity, a freelance project, mentoring, or simply to talk about design and UX, reach out anytime.", "Me parecería interesante leer tu opinión. Y si quieres ponerte en contacto conmigo para nuevas oportunidades laborales, un proyecto freelance, una mentoría o simplemente para conversar sobre el mundo del diseño y del UX, contáctame cuando quieras.");
  es.set("Cheers!", "¡Saludos!");

  const attributeTranslations = new Map([
    ["Article navigation", "Navegación del artículo"],
    ["Article metadata", "Información del artículo"],
    ["Article topics", "Temas del artículo"],
    ["Photos from my visit to Mercado Libre’s offices in Buenos Aires", "Fotografías de mi visita a las oficinas de Mercado Libre en Buenos Aires"],

    ['Mobile version under construction','Versión móvil en construcción'],
    ['Open navigation','Abrir navegación'],
    ['Close navigation','Cerrar navegación'],
    ['Language selection','Selección de idioma'],
    ['Page sections','Secciones de la página'],
    ['My articles','Mis artículos'],
    ['Internal page navigation','Navegación de página interna'],
    ['Story chapters','Capítulos de la historia'],
    ['Error page navigation','Navegación de página de error'],
    ['Scroll to see projects','Desplázate para ver los proyectos'],
    ['View Registro Mercado Libre project','Ver proyecto Registro Mercado Libre'],
    ['View Motion Design System project','Ver proyecto Sistema de Motion Design'],
    ['Mercado Libre sign-up flow mockups','Mockups del flujo de registro en Mercado Libre'],
    ['Why I\'ve worked with 4 different teams at Mercado Libre','Por qué he trabajado con 4 equipos diferentes en Mercado Libre'],
    ['A bad interface not only creates a bad experience, it could be much worse','Una mala interfaz no solo crea una mala experiencia: puede ser mucho peor'],
    ["What I've learned from my other passion, music, about a good experience",'Lo que mi otra pasión, la música, me enseñó sobre una buena experiencia'],
    ['Sign up with email — flow part 1','Registro con correo — parte 1 del flujo'],
    ['Sign up with email — flow part 2','Registro con correo — parte 2 del flujo'],
    ['Sign up with Google — flow part 1','Registro con Google — parte 1 del flujo'],
    ['Sign up with Google — flow part 2','Registro con Google — parte 2 del flujo'],
    ['Sign up with phone — flow part 1','Registro con teléfono — parte 1 del flujo'],
    ['Sign up with phone — flow part 2','Registro con teléfono — parte 2 del flujo'],
    ['User flow diagram','Diagrama del flujo de usuario'],
    ['Three examples showing fast, medium, and slow motion levels','Tres ejemplos de niveles de motion rápido, medio y lento'],
    ['Fast motion example','Ejemplo de motion rápido'],
    ['Medium motion example','Ejemplo de motion medio'],
    ['Slow motion example','Ejemplo de motion lento'],
    ['Roadmap for the initial phases of the Motion Level design system','Roadmap de las fases iniciales del sistema Motion Level'],
    ['Benchmark of external design systems and motion design references','Benchmark de design systems externos y referencias de motion design'],
    ['Internal audit of custom animations created at Mercado Libre','Auditoría interna de animaciones personalizadas creadas en Mercado Libre'],
    ['First definition of the Motion Level framework','Primera definición del framework Motion Level']
  ]);
  const pageTitles = new Map([
    ["Why Mercado Libre Was the First Place I Didn't Want to Leave — David Montealegre", "Por qué Mercado Libre fue el primer lugar del que no quise irme — David Montealegre"],
    ['David Montealegre — Product Designer','David Montealegre — Diseñador de producto'],
    ['About — David Montealegre','Sobre mí — David Montealegre'],
    ['Page not found — David Montealegre','Página no encontrada — David Montealegre'],
    ['This page is under work — David Montealegre','Página en construcción — David Montealegre'],
    ['Registro Mercado Libre — David Montealegre','Registro Mercado Libre — David Montealegre'],
    ['Motion Design System — David Montealegre','Sistema de Motion Design — David Montealegre']
  ]);
  // Home v2 — public qualitative summaries and current project status.
  [
    ["Contact:", "Contacto:"],
    ["Scroll down", "Desliza hacia abajo"],
    ["8 years of experience in UI, UX, and product design.", "8 años de experiencia en UI, UX y diseño de producto."],
    ["5 years designing at Mercado Libre, the Amazon of Latin America, and Mercado Pago.", "5 años diseñando en Mercado Libre, el Amazon de Latinoamérica, y Mercado Pago."],
    ["1 year as a freelance product designer.", "1 año como diseñador de producto freelance."],
    ["Entrepreneur at MH Support.", "Emprendedor en MH Support."],
    ["Registro ML", "Registro ML"],
    ["Role: Senior UX analyst / UI designer", "Rol: Senior UX analyst / UI designer"],
    ["Role: UX / interaction analyst", "Rol: UX / interaction analyst"],
    ["Outcome", "Resultado"],
    ["Status", "Estado"],
    ["See case study", "Ver caso de estudio"],
    ["Download my resume", "Descargar mi curriculum"],
    ["Accounts for minors in Mexico", "Cuentas para menores en México"],
    ["Country switch", "Switch entre países"],
    ["Play preview", "Reproducir vista previa"],
    ["Case study not available yet", "Caso de estudio aún no disponible"],
    ["This project’s case study requires validation and protected access before publication.", "Este caso de estudio requiere validación y acceso protegido antes de publicarse."],
    ["Close", "Cerrar"],
    ["Skip to content", "Ir al contenido"],
    ["I redesigned sign-up for Mercado Libre, the Amazon of Latin America, to reduce friction during account creation.", "Rediseñé el registro para Mercado Libre, el Amazon de Latinoamérica, para reducir la fricción al crear una cuenta."],
    ["A simpler registration experience reduced completion time and improved conversion across Latin America.", "Una experiencia de registro más simple redujo el tiempo de finalización y mejoró la conversión en Latinoamérica."],
    ["I contributed to the foundations of the design system at Mercado Libre, the Amazon of Latin America, by creating the Motion Level framework.", "Contribuí a los fundamentos del design system en Mercado Libre, el Amazon de Latinoamérica, creando el framework Motion Level."],
    ["A shared framework helps designers and developers choose how expressive an animation should be in its context.", "Un framework compartido ayuda a diseño y desarrollo a elegir qué tan expresiva debe ser una animación según su contexto."],
    ["An active project exploring account creation for minors in Mexico.", "Un proyecto activo que explora la creación de cuentas para menores en México."],
    ["In development. Production results are not available yet.", "En desarrollo. Aún no hay resultados de producción."],
    ["I designed the account-switching animation for Mercado Libre, the Amazon of Latin America, and Mercado Pago.", "Diseñé la animación de cambio de cuenta para Mercado Libre, el Amazon de Latinoamérica, y Mercado Pago."],
    ["An account-switching experience supported by animation specifications and implementation guidelines.", "Una experiencia de cambio de cuenta acompañada de especificaciones de animación y guías de implementación."],
    ["My first UX role was as a web designer, back when the discipline was still taking shape. Since then, I’ve spent eight years designing digital products across marketplaces, fintech, and B2B services. I’ve worked in startups and established companies.", "Mi primer rol en UX fue como diseñador web, cuando la disciplina todavía estaba tomando forma. Desde entonces, llevo ocho años diseñando productos digitales para marketplaces, fintech y servicios B2B. He trabajado en startups y empresas consolidadas."],
    ["A couple of years ago, an interviewer asked me: why have you stayed so long at the same…", "Hace un par de años, un entrevistador me preguntó: ¿por qué has permanecido tanto tiempo en la misma…"],
    ["I'm not only a designer who likes to create interfaces, I’m also passionate about automotive UX…", "No solo soy un diseñador al que le gusta crear interfaces, también me apasiona el UX automotriz…"]
  ].forEach(([source, translation]) => es.set(source, translation));
  // Home final revision, October 13, 2026.
  es.set("About me", "Acerca de mí");
  es.set("Continue reading", "Continuar leyendo");
  es.set("Why I\'ve worked with 4 different teams at Mercado Libre", "Por qué trabajé con cuatro equipos diferentes en Mercado Libre");
  [["Case studies", "Casos de estudio"], ["Personal blog", "Blog personal"], ["Learn more about me", "Conoce más sobre mí"], ["Explore my case studies", "Revisa mis casos de estudio"], ["View my resume", "Revisa mi hoja de vida"], ["Explore my personal blog", "Revisa mi blog personal"], ["Schedule a call", "Agenda una llamada"], ["Intro", "Intro"], ["Case 1", "Caso 1"], ["Case 2", "Caso 2"], ["Case 3", "Caso 3"], ["Case 4", "Caso 4"], ["Blog", "Blog"], ["5 years designing at Mercado Libre / Mercado Pago for people across Latin America.", "5 años diseñando en Mercado Libre / Mercado Pago para personas en Latinoamérica."], ["Currently moving into design engineering.", "Actualmente en transición hacia el rol de design engineering."], ["Mentor at ADPlist and an active member of UX learning communities.", "Mentor en ADPlist y miembro activo de comunidades de educación y formación en UX."], ["Aspiring entrepreneur.", "Emprendedor en formación."], ["I’m a graphic designer with 10 years of experience, most of them in UX. Beyond design, my interests include:", "Soy un diseñador gráfico con 10 años de experiencia, la mayoría de ellos en UX, y entre otros de mis intereses además del diseño también están:"], ["Photography as an amateur landscape photographer.", "La fotografía como paisajista amateur."], ["Music as an amateur guitarist.", "La música como guitarrista aficionado."], ["Trekking and spending time in nature.", "El trekking como amante de la naturaleza."], ["Driving and the automotive industry.", "La conducción y la industria automotriz como entusiasta."], ["Building products as an aspiring entrepreneur.", "La construcción de productos como futuro emprendedor."], ["These passions shape my approach to design, the projects I love working on, and the knowledge I enjoy sharing on my personal blog.", "Todas estas pasiones dan forma a mi mentalidad de diseño y marcan los tipos de proyectos en los que amo trabajar y el conocimiento que disfruto compartir en mi blog personal."], ["Want to learn more about my professional experience? Take a look at my resume.", "¿Quieres conocer más sobre mí a nivel profesional? Puedes revisar mi hoja de vida."], ["Mercado Libre sign-up", "Registro ML en Mercado Libre"], ["Motion design system — Motion Level", "Motion design system — Motion Level"], ["Switching accounts across countries", "Switch de cuentas entre países"], ["I led the iteration of Mercado Libre’s sign-up model for people across Latin America.", "Lideré la iteración del modelo de registro de Mercado Libre para personas en Latinoamérica."], ["I co-led the first phase of Mercado Libre’s motion design system, developing the conceptual foundation for Motion Level.", "Co-lideré la primera fase del motion design system de Mercado Libre, desarrollando el marco conceptual de Motion Level."], ["I designed the account creation flow for minors in Mexico, working within Mexican regulatory requirements.", "Diseñé el flujo de creación de cuentas para menores en México bajo la normativa mexicana."], ["I created an animated account-switching flow for people with accounts in different Latin American countries.", "Creé la experiencia de switch entre países, un flujo animado para personas con cuentas en varios países de Latinoamérica."], ["Role: Senior UX analyst / UI designer", "Rol: Analista senior de UX / Diseñador UI"], ["Now that you know a little more about me, what’s your next step?", "Y ya que sabes un poco más de mí, ¿cuál es tu siguiente paso?"], ["Whether it’s an exciting project or a role on your team, I want to work on product and experience challenges that inspire me. Could we work together?", "Ya sea para un proyecto apasionante o para una vacante dentro de tu gran equipo, lo que más quiero es trabajar en desafíos de experiencia y producto que me llenen de entusiasmo y pasión por resolver. ¿Crees que podemos trabajar juntos?"]].forEach(([source, translation]) => es.set(source, translation));
  // Final case card content approved from Figma on October 13, 2026.
  [["Mercado Libre sign-up", "Registro en Mercado Libre"], ["Role: Senior UX analyst / UI designer", "Rol: Analista senior de UX / Diseñador UI"], ["I led the iteration of Mercado Libre’s sign-up model, impacting 60 million users across 9 Latin American countries.", "Lideré la iteración del modelo de registro para Mercado Libre, impactando a 60 millones de usuarios en 9 países de América Latina."], ["I reduced average sign-up time from 3:25 minutes to 52 seconds", "Reduje el tiempo promedio de registro de 3:25 minutos a 52 segundos"], [" and increased conversion by more than 10%, depending on the country.", " y aumenté la conversión en más de un 10%, según el país."], ["Motion design system - Motion Level", "Motion design system - motion level"], ["Role: Senior UX analyst / UI designer", "Rol: Analista Senior de UX / Diseñador UI"], ["I co-led the first phase of Mercado Libre’s motion design system, developing the conceptual foundation for the Motion Level framework.", "Co-lideré la primera fase de creación del motion design system de Mercado Libre, desarrollando el marco conceptual para el framework de motion level."], ["I created the conceptual framework that unifies how expressive motion is at Mercado Libre", "Creé el marco conceptual que unifica el nivel de expresividad del movimiento en Mercado Libre"], [", impacting more than 200 UX analysts and developers within the organization.", ", impactando a más de 200 analistas de UX y desarrolladores dentro de la organización."], ["Sign-up for minors in Mexico", "Registro para menores en México"], ["Role: Senior UX analyst / UI designer", "Rol: Analista senior de UX / Diseñador UI"], ["I designed Mercado Pago’s sign-up flow for minors in Mexico, working within Mexican regulations, among the most demanding in Latin America.", "Diseñé el flujo de registro para menores de Mercado Pago en México, un flujo regulado bajo la normativa mexicana, una de las más exigentes de Latinoamérica."], ["I iterated on the Mexico flow using insights from Argentina and Brazil, ", "Iteré el flujo de México usando insights de Argentina y Brasil, "], ["reducing identity verification time from 24 hours to 20 seconds", "reduje el tiempo de validación de identidad de 24 horas a 20 segundos"], [".", "."], ["Switching accounts across countries", "Switch de cuentas entre países"], ["Role: Senior UX analyst / UI designer", "Rol: Analista UX senior / Diseñador UI"], ["I created the cross-country account-switching experience, an animated flow that people with accounts in several Latin American countries see when switching between them.", "Creé la experiencia de switch entre países, un flujo animado visible para las personas con cuentas en varios países de Latinoamérica al momento de cambiar entre ellas."], ["I improved the experience for 200k people with multiple accounts across Brazil, Argentina and Uruguay,", "Impacté la experiencia de 200k personas con más de una cuenta entre Brasil, Argentina y Uruguay,"], [" a number that has continued to grow in recent quarters.", " un número que viene creciendo en los últimos quarters."]].forEach(([source, translation]) => es.set(source.trim(), translation.trim()));
  const en = new Map([...es].map(([a,b])=>[b,a]));
  const original = new WeakMap();
  const clean = s => s.replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();

  // Home v2 accessibility and media descriptions from the October 9 Figma notes.
  [
  [
    "Go to my LinkedIn profile",
    "Ir a mi perfil en LinkedIn"
  ],
  [
    "Go to my ADPlist profile",
    "Ir a mi perfil en ADPlist"
  ],
  [
    "Send me an email",
    "Enviarme un email"
  ],
  [
    "Send me a message on WhatsApp",
    "Enviar un mensaje por WhatsApp"
  ],
  [
    "Change language",
    "Cambiar idioma"
  ],
  [
    "David Montealegre, product designer. Back to introduction",
    "David Montealegre, diseñador de producto. Volver a la presentación"
  ],
  [
    "Scroll down to selected work",
    "Desliza hacia abajo hasta mis proyectos"
  ],
  [
    "Move left",
    "Mover a la izquierda"
  ],
  [
    "Move right",
    "Mover a la derecha"
  ],
  [
    "Article selection",
    "Selección de artículos"
  ],
  [
    "Article carousel",
    "Carrusel de artículos"
  ],
  [
    "Article carousel controls",
    "Controles del carrusel de artículos"
  ],
  [
    "Mobile navigation",
    "Navegación móvil"
  ],
  [
    "Main navigation",
    "Navegación principal"
  ],
  [
    "Entry into Mercado Libre’s unified sign-up flow.",
    "Entrada al flujo de registro unificado en Mercado Libre."
  ],
  [
    "Play preview: Registro ML",
    "Reproducir vista previa: Registro ML"
  ],
  [
    "See case study: Registro ML",
    "Ver caso de estudio: Registro ML"
  ],
  [
    "Easing tests for the motion design system at Mercado Libre.",
    "Test de easings del motion design system en Mercado Libre."
  ],
  [
    "Play preview: Motion Level",
    "Reproducir vista previa: Motion Level"
  ],
  [
    "See case study: Motion Level",
    "Ver caso de estudio: Motion Level"
  ],
  [
    "Account creation flow for minors in Mercado Pago in Mexico.",
    "Flujo de creación de cuenta para menores de edad en Mercado Pago en México."
  ],
  [
    "Play preview: Accounts for minors in Mexico",
    "Reproducir vista previa: Cuentas para menores en México"
  ],
  [
    "See case study: Accounts for minors in Mexico",
    "Ver caso de estudio: Cuentas para menores en México"
  ],
  [
    "Switching accounts between Argentina and Brazil in Mercado Pago.",
    "Flujo de cambio de cuentas entre países en Mercado Pago entre Argentina y Brasil."
  ],
  [
    "Play preview: Country switch",
    "Reproducir vista previa: Switch entre países"
  ],
  [
    "See case study: Country switch",
    "Ver caso de estudio: Switch entre países"
  ],
  [
    "Photograph of Mercado Libre’s offices.",
    "Fotografía de las oficinas de Mercado Libre."
  ],
  [
    "Photograph of the driver interface in a Mazda.",
    "Fotografía de la interfaz del conductor de un Mazda."
  ],
  [
    "Photograph of a guitar.",
    "Fotografía de una guitarra."
  ],
  [
    "Continue reading: Why I've worked with 4 different teams at Mercado Libre",
    "Continuar leyendo: Por qué he trabajado con 4 equipos diferentes en Mercado Libre"
  ],
  [
    "Continue reading: A bad interface not only creates a bad experience, it could be much worse",
    "Continuar leyendo: Una mala interfaz no solo crea una mala experiencia: puede ser mucho peor"
  ],
  [
    "Continue reading: What I've learned from my other passion, music, about a good experience",
    "Continuar leyendo: Lo que mi otra pasión, la música, me enseñó sobre una buena experiencia"
  ]
].forEach(([source, translation]) => attributeTranslations.set(source, translation));

  [
  [
    "Entry into Mercado Libre’s unified sign-up flow.",
    "Entrada al flujo de registro unificado en Mercado Libre."
  ],
  [
    "Easing tests for the motion design system at Mercado Libre.",
    "Test de easings del motion design system en Mercado Libre."
  ],
  [
    "Account creation flow for minors in Mercado Pago in Mexico.",
    "Flujo de creación de cuenta para menores de edad en Mercado Pago en México."
  ],
  [
    "Switching accounts between Argentina and Brazil in Mercado Pago.",
    "Flujo de cambio de cuentas entre países en Mercado Pago entre Argentina y Brasil."
  ],
  [
    "Article selection",
    "Selección de artículos"
  ]
].forEach(([source, translation]) => es.set(source, translation));
  attributeTranslations.set("Visit my profile on LinkedIn", "Visitar mi perfil en LinkedIn");
  attributeTranslations.set("Schedule a call", "Agenda una llamada");
  attributeTranslations.set("Learn more about me", "Conoce más sobre mí");
  function apply(language){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(node.parentElement?.closest('script,style,[data-home-title],[data-case-role-es]'))return;
      if(!original.has(node))original.set(node,node.nodeValue);
      const raw=original.get(node),key=clean(raw); if(!key)return;
      const value=language==='es'?(es.get(key)||key):(en.get(key)||key);
      node.nodeValue=(raw.match(/^\s*/)?.[0]||'')+value+(raw.match(/\s*$/)?.[0]||'');
    });
    document.querySelectorAll('[data-case-role-es]').forEach(el => { el.textContent = language === 'es' ? el.dataset.caseRoleEs : el.dataset.caseRoleEn; });
    document.querySelectorAll('[placeholder]').forEach(el=>{if(!el.dataset.placeholderEn)el.dataset.placeholderEn=el.placeholder;el.placeholder=language==='es'?'Yo habría…':el.dataset.placeholderEn;});
    document.querySelectorAll('[aria-label],[alt]').forEach(el=>{
      ['aria-label','alt'].forEach(attribute=>{
        if(!el.hasAttribute(attribute))return;
        const dataKey=attribute==='aria-label'?'ariaLabelEn':'altEn';
        if(el.dataset[dataKey]===undefined)el.dataset[dataKey]=el.getAttribute(attribute);
        const source=el.dataset[dataKey];
        el.setAttribute(attribute,language==='es'?(attributeTranslations.get(source)||source):source);
      });
    });
    if(!document.documentElement.dataset.titleEn)document.documentElement.dataset.titleEn=document.title;
    const titleEn=document.documentElement.dataset.titleEn;
    document.title=language==='es'?(pageTitles.get(titleEn)||titleEn):titleEn;
    document.documentElement.lang=language;
    document.dispatchEvent(new CustomEvent("portfolio:translated", {detail:{language}}));
  }
  window.PortfolioI18n={apply};
})();
