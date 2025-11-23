// --- CONFIGURACIÓN DEL EXAMEN ---
const PASSING_SCORE_PERCENTAGE = 70;
const TIME_LIMIT_MINUTES = 60;
const ATTEMPT_STORAGE_KEY = 'examenBiologiaAttempts';

// --- DATOS DEL EXAMEN: 30 Preguntas ---
const questions = [
    // Preguntas 1-10: Múltiple Opción
    {
        id: 1, type: 'multiple-choice',
        question: 'Según las fuentes, ¿cuál de las siguientes es una de las tres condiciones necesarias para que un ecosistema se encuentre en estado de equilibrio?',
        options: [
            'Que el ecosistema se encuentre completamente aislado de cualquier influencia externa.',
            'Que el número de individuos en las poblaciones se mantenga más o menos constante.',
            'Que se produzcan cambios abruptos y repentinos en el clima para fomentar la adaptación.',
            'Que la biodiversidad se reduzca a las especies mejor adaptadas.'
        ],
        answer: 'Que el número de individuos en las poblaciones se mantenga más o menos constante.',
        explanation: 'Para que un ecosistema esté en equilibrio, se requiere que el número de individuos en las poblaciones debe mantenerse más o menos constante [1].'
    },
    {
        id: 2, type: 'multiple-choice',
        question: '¿Qué tipo de relación intraespecífica se establece entre individuos emparentados y tiene como finalidad principal la reproducción y el cuidado de las crías?',
        options: ['Coloniales', 'Estatales', 'Gregarias', 'Familiares'],
        answer: 'Familiares',
        explanation: 'Las relaciones Familiares se establecen entre individuos emparentados, enfocadas en la reproducción y el cuidado de las crías [1].'
    },
    {
        id: 3, type: 'multiple-choice',
        question: 'En una relación de Parasitismo, el parásito recibe un beneficio (+) y el hospedador resulta perjudicado (-). ¿Cuál es una característica clave de esta relación, según las fuentes?',
        options: [
            'Es similar a la depredación, pues el hospedador siempre muere rápidamente.',
            'El parásito solo se alimenta de secreciones o alimento sobrante.',
            'El parásito vive a expensas de otro individuo, sin causarle la muerte a corto plazo.',
            'Ambos individuos se benefician mutuamente de la interacción.'
        ],
        answer: 'El parásito vive a expensas de otro individuo, sin causarle la muerte a corto plazo.',
        explanation: 'En el Parasitismo, el parásito obtiene un beneficio (vive a expensas de otro), y el hospedador resulta perjudicado, sin causar la muerte a corto plazo [1].'
    },
    {
        id: 4, type: 'multiple-choice',
        question: 'Los Productores se encuentran siempre en el extremo izquierdo de una Cadena Alimentaria. ¿Qué característica trófica poseen?',
        options: [
            'Son Consumidores de Tercer Orden (C3).',
            'Son organismos heterótrofos.',
            'Son organismos autótrofos que producen su propio alimento mediante fotosíntesis.',
            'Son siempre Descomponedores (D).'
        ],
        answer: 'Son organismos autótrofos que producen su propio alimento mediante fotosíntesis.',
        explanation: 'Los Productores son organismos autótrofos (como las plantas) que producen su propio alimento [2]. Se hallan siempre en el extremo izquierdo de la cadena trófica [3].'
    },
    {
        id: 5, type: 'multiple-choice',
        question: 'Si un embrión se desarrolla dentro de un huevo que permanece dentro del cuerpo de la hembra, y el huevo le brinda el alimento, se clasifica como:',
        options: ['Vivíparo', 'Ovíparo', 'Desarrollo Directo', 'Ovovivíparo'],
        answer: 'Ovovivíparo',
        explanation: 'En los Ovovivíparos, el embrión se desarrolla dentro de un huevo que permanece dentro del cuerpo de la hembra, y el huevo le brinda el alimento [4].'
    },
    {
        id: 6, type: 'multiple-choice',
        question: '¿Qué concepto se refiere al conjunto de cambios más visibles que ocurren en la vida de un organismo, incluyendo la maduración de distintas partes del cuerpo?',
        options: ['Crecimiento', 'Desarrollo', 'Ciclo Vital', 'Adaptación'],
        answer: 'Desarrollo',
        explanation: 'El Desarrollo es el conjunto de cambios más visibles que ocurren en la vida de un organismo, incluyendo la maduración de distintas partes del cuerpo. El desarrollo posterior a la fecundación se llama desarrollo embrionario [4].'
    },
    {
        id: 7, type: 'multiple-choice',
        question: '¿Cuál es la consecuencia biológica de la reproducción sexual que combina material genético de los progenitores?',
        options: [
            'Garantiza que el ser vivo resultante sea genéticamente idéntico a uno de los padres.',
            'Es el origen de la variabilidad genética de una especie.',
            'Elimina la posibilidad de supervivencia frente a cambios ambientales.',
            'Asegura que el embrión se desarrolle siempre de forma ovípara.'
        ],
        answer: 'Es el origen de la variabilidad genética de una especie.',
        explanation: 'La reproducción sexual es el origen de la variabilidad genética de una especie, lo que ofrece mayores posibilidades de supervivencia frente a los cambios ambientales [4].'
    },
    {
        id: 8, type: 'multiple-choice',
        question: '¿Cuál de las siguientes relaciones interespecíficas se caracteriza por la notación (+, +)?',
        options: ['Competencia', 'Depredación', 'Mutualismo', 'Comensalismo'],
        answer: 'Mutualismo',
        explanation: 'En el Mutualismo (+, +), los dos individuos se asocian para beneficiarse mutuamente [1].'
    },
    {
        id: 9, type: 'multiple-choice',
        question: '¿Cuál es la función de los Descomponedores en el ecosistema, según las fuentes?',
        options: [
            'Producir alimento mediante fotosíntesis.',
            'Alimentarse de la materia orgánica en descomposición (restos de otros seres vivos).',
            'Constituir siempre el Consumidor de Tercer Orden (C3).',
            'Actuar como depredadores únicamente.'
        ],
        answer: 'Alimentarse de la materia orgánica en descomposición (restos de otros seres vivos).',
        explanation: 'Los Descomponedores (hongos y bacterias) son organismos heterótrofos que se alimentan de la materia orgánica en descomposición (restos de otros seres vivos) [2, 3, 5].'
    },
    {
        id: 10, type: 'multiple-choice',
        question: 'En las Pirámides Ecológicas de Energía, ¿qué sucede con la energía obtenida en cada nivel trófico?',
        options: [
            'La totalidad de la energía pasa al nivel subsiguiente.',
            'Se utiliza parte de la energía, y otra parte se pierde en forma de calor.',
            'El nivel superior (consumidores) tiene más energía que el nivel inferior (productores).',
            'La energía solo se recicla, pero nunca se pierde.'
        ],
        answer: 'Se utiliza parte de la energía, y otra parte se pierde en forma de calor.',
        explanation: 'En las pirámides de energía, en cada nivel trófico se utiliza parte de la energía obtenida, y otra parte se pierde en forma de calor, quedando no disponible para los niveles subsiguientes [6].'
    },

    // Preguntas 11-20: Verdadero o Falso
    {
        id: 11, type: 'true-false',
        question: 'Verdadero o Falso: La Biología es la ciencia que estudia a los seres vivos, los cuales se caracterizan, entre otras cosas, por ser homeotermos y poseer ADN.',
        options: ['Verdadero', 'Falso'],
        answer: 'Verdadero',
        explanation: 'Los seres vivos son estudiados por la Biología y sus características incluyen responder a estímulos, ser homeotermos, poseer ADN, adaptarse y evolucionar [7].'
    },
    {
        id: 12, type: 'true-false',
        question: 'Verdadero o Falso: Los organismos eucariotas son siempre autótrofos.',
        options: ['Verdadero', 'Falso'],
        answer: 'Falso',
        explanation: 'Los organismos eucariotas (animales y plantas) pueden ser tanto autótrofos como heterótrofos, dependiendo del reino biológico al que pertenezcan [8].'
    },
    {
        id: 13, type: 'true-false',
        question: 'Verdadero o Falso: La Competencia se clasifica como una relación interespecífica (+, -).',
        options: ['Verdadero', 'Falso'],
        answer: 'Falso',
        explanation: 'La Competencia interespecífica se clasifica como (-,-), resultando perjudicial para ambos individuos [1].'
    },
    {
        id: 14, type: 'true-false',
        question: 'Verdadero o Falso: Las células son las unidades estructurales y funcionales de los seres vivos, y existen dos tipos principales: procariota y eucariota.',
        options: ['Verdadero', 'Falso'],
        answer: 'Verdadero',
        explanation: 'Las células son las unidades estructurales y funcionales de los seres vivos. Los tipos son procariota (bacterias) y eucariota (animales y plantas) [8].'
    },
    {
        id: 15, type: 'true-false',
        question: 'Verdadero o Falso: Un ecosistema marino se considera un macrosistema natural acuático.',
        options: ['Verdadero', 'Falso'],
        answer: 'Verdadero',
        explanation: 'El ecosistema marino se considera un macrosistema natural acuático [9].'
    },
    {
        id: 16, type: 'true-false',
        question: 'Verdadero o Falso: El crecimiento en los seres vivos ocurre desde el exterior, mediante la absorción de materiales.',
        options: ['Verdadero', 'Falso'],
        answer: 'Falso',
        explanation: 'El Crecimiento es el aumento de tamaño que ocurre desde el interior, gracias a los materiales asimilados en la nutrición [4].'
    },
    {
        id: 17, type: 'true-false',
        question: 'Verdadero o Falso: La flecha en una Cadena Trófica se orienta hacia la izquierda y significa "es devorado por".',
        options: ['Verdadero', 'Falso'],
        answer: 'Falso',
        explanation: 'La flecha en la Cadena Trófica se orienta hacia la derecha y significa "es comido por" [3, 10].'
    },
    {
        id: 18, type: 'true-false',
        question: 'Verdadero o Falso: Una desventaja de las relaciones gregarias o estatales es el riesgo de infección por enfermedades contagiosas.',
        options: ['Verdadero', 'Falso'],
        answer: 'Verdadero',
        explanation: 'Una desventaja de este tipo de relación es el riesgo de infección por enfermedades contagiosas, lo que puede llevar a la eliminación de otros miembros del grupo [1].'
    },
    {
        id: 19, type: 'true-false',
        question: 'Verdadero o Falso: La fecundación es la fusión del espermatozoide (gameto masculino) y el óvulo (gameto femenino), resultando en un cigoto.',
        options: ['Verdadero', 'Falso'],
        answer: 'Verdadero',
        explanation: 'La reproducción sexual se produce mediante la fecundación, que es la fusión de los gametos (espermatozoide masculino y óvulo femenino), y el resultado es un cigoto [4].'
    },
    {
        id: 20, type: 'true-false',
        question: 'Verdadero o Falso: Las alteraciones que tienen lugar en los ecosistemas pueden deberse a causas naturales (como incendios espontáneos) o artificiales (origen humano).',
        options: ['Verdadero', 'Falso'],
        answer: 'Verdadero',
        explanation: 'Las alteraciones que tienen lugar en los ecosistemas pueden deberse a distintas causas; las causas pueden ser naturales (ej. incendios espontáneos) o artificiales (origen humano, ej. contaminación) [1].'
    },

    // Preguntas 21-30: Basadas en Diagramas/Extracción y Aplicación de Conceptos
    {
        id: 21, type: 'multiple-choice',
        question: 'Identifique qué relación se da entre los Acatos (que se alimentan de células) y las Células, de acuerdo con el ejemplo de las fuentes. ¿Es Inter o Intraespecífica?',
        options: ['Interespecífica', 'Intraespecífica'],
        answer: 'Intraespecífica',
        explanation: 'El ejemplo provisto en las fuentes clasifica la relación donde los Ácaros se alimentan de células como Intraespecífica [2].'
    },
    {
        id: 22, type: 'multiple-choice',
        question: 'Identifique el tipo de desarrollo embrionario en el que el embrión recibe nutrición y protección por medio de un órgano llamado placenta.',
        options: ['Ovíparo', 'Vivíparo', 'Ovovivíparo', 'Desarrollo Directo'],
        answer: 'Vivíparo',
        explanation: 'En el desarrollo Vivíparo, el embrión se desarrolla directamente dentro del cuerpo de la madre, recibiendo nutrición y protección por medio de un órgano llamado placenta [4].'
    },
    {
        id: 23, type: 'multiple-choice',
        question: 'En la Cadena Trófica de la Selva Amazónica (FIG. 207), ¿quién es el Consumidor de Primer Orden (C1)?',
        options: [
            'Bromeliáceas, Lapachos, Palmeras (Productores).',
            'Jaguar (Consumidor 4).',
            'Escarabajos y Mariposas (Consumidor 1).',
            'Harpía (Consumidor 3).'
        ],
        answer: 'Escarabajos y Mariposas (Consumidor 1).',
        explanation: 'De acuerdo con el diagrama de la Selva Amazónica, los Escarabajos y Mariposas son los Consumidores de 1er Orden [11].'
    },
    {
        id: 24, type: 'multiple-choice',
        question: 'En la Pirámide del Desierto (FIG. 208), ¿quién ocupa el nivel de Consumidor Terciario (C3)?',
        options: ['Cactos', 'Ratones Silvestres', 'Escorpiones', 'Cascabeles'],
        answer: 'Cascabeles',
        explanation: 'En la Pirámide del Desierto, los Consumidores Terciarios son los Cascabeles [5].'
    },
    {
        id: 25, type: 'multiple-choice',
        question: '¿Qué término define la representación de todas las cadenas alimentarias de una comunidad formando una red?',
        options: ['Ciclo Vital', 'Pirámide Ecológica', 'Cadena Trófica', 'Red Trófica o Alimentaria'],
        answer: 'Red Trófica o Alimentaria',
        explanation: 'Una red trófica o alimentaria es una representación que permite visualizar cuáles organismos son consumidos por cuáles poblaciones, formando una red [3].'
    },
    {
        id: 26, type: 'multiple-choice',
        question: 'La fusión de los gametos masculino (espermatozoide) y femenino (óvulo) da como resultado inmediato un:',
        options: ['Feto', 'Embrión', 'Cigoto', 'Acrón'],
        answer: 'Cigoto',
        explanation: 'El resultado de la fecundación (fusión de gametos) es un cigoto, que luego pasa a ser embrión y finalmente feto [4].'
    },
    {
        id: 27, type: 'multiple-choice',
        question: '¿Cuál de los siguientes es un beneficio de las relaciones Gregarias/Estatales, según las fuentes?',
        options: [
            'Riesgo de infección por enfermedades contagiosas.',
            'Mayor movilidad para detectar predadores o buscar alimento.',
            'División de trabajo sin jerarquía.',
            'Especialización únicamente en el cuidado de las crías.'
        ],
        answer: 'Mayor movilidad para detectar predadores o buscar alimento.',
        explanation: 'Los beneficios de las relaciones Gregarias incluyen movilidad para detectar predadores de caza, buscar alimento y posibilidades de conseguir pareja [1].'
    },
    {
        id: 28, type: 'multiple-choice-figure',
        question: 'Observa la Red Trófica (Zorros, Conejos, Zanahorias, etc.) de las fuentes (p. 8). ¿Cuál de las siguientes es una cadena trófica de 3 eslabones (sin contar el descomponedor)?',
        options: [
            'Cereales → Ratones → Búhos',
            'Zanahorias → Conejos → Zorros',
            'Hierbas → Saltamontes → Búhos',
            'Aves → Cereales → Ratones'
        ],
        answer: 'Zanahorias → Conejos → Zorros',
        image: 'red_trofica_examen.png', 
        explanation: 'En la red trófica estándar (basada en el examen 1), las Zanahorias (P) son comidas por los Conejos (C1), y los Conejos (C1) son comidos por los Zorros (C2). (Cadena: P → C1 → C2) [9, 12].'
    },
    {
        id: 29, type: 'multiple-choice-figure',
        question: 'Según la Cadena Trófica del Desierto (Cactos, Ratones, Escorpiones, Cascabeles), si los Ratones (C1) desaparecen, ¿qué población se vería inmediatamente perjudicada?',
        options: [
            'Los Cactos (Productores).',
            'Los Descomponedores.',
            'Los Escorpiones (C2).',
            'Los Cascabeles (C3).'
        ],
        answer: 'Los Escorpiones (C2).',
        explanation: 'Los Escorpiones son Consumidores Secundarios que dependen directamente de los Consumidores Primarios (Ratones silvestres). Su desaparición afectaría inmediatamente a la fuente de alimento de los C2 [5].'
    },
    {
        id: 30, type: 'multiple-choice',
        question: 'La unión de todos los ecosistemas de la Tierra relacionados entre sí forma una gran unidad ecológica denominada:',
        options: ['Ecología', 'Placenta', 'Biosfera', 'Comensalismo'],
        answer: 'Biosfera',
        explanation: 'Todos los ecosistemas de la Tierra están relacionados entre sí, formando una gran unidad ecológica denominada la biosfera [1].'
    }
];

let timerInterval;
let timeLeft = TIME_LIMIT_MINUTES * 60; // 60 minutos en segundos
let isPaused = false;

// --- GESTIÓN DE LOCAL STORAGE E INTENTOS ---

function getAttempts() {
    const storedAttempts = localStorage.getItem(ATTEMPT_STORAGE_KEY);
    return storedAttempts ? JSON.parse(storedAttempts) : [];
}

function saveAttempt(score, passed) {
    const attempts = getAttempts();
    const now = new Date();
    const attempt = {
        score: score.toFixed(2),
        status: passed ? 'Aprobado' : 'Desaprobado',
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };
    attempts.push(attempt);
    localStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(attempts));
    return attempts.length;
}

function renderAttemptHistory() {
    const attempts = getAttempts();
    const historyDiv = document.getElementById('attempt-history');
    
    if (attempts.length === 0) {
        historyDiv.textContent = 'No hay intentos registrados.';
        return;
    }

    historyDiv.innerHTML = '<h4>Intentos previos:</h4>';
    attempts.forEach((att, index) => {
        const item = document.createElement('div');
        item.classList.add('attempt-item');
        item.innerHTML = `<strong>Intento ${index + 1}:</strong> ${att.status} (${att.score}%) | Fecha: ${att.date} ${att.time}`;
        historyDiv.appendChild(item);
    });
}


// --- LÓGICA DEL EXAMEN ---

function renderQuiz() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = ''; 

    questions.forEach((q, index) => {
        const block = document.createElement('div');
        block.classList.add('question-block');

        const title = document.createElement('h3');
        title.textContent = `P${index + 1}: ${q.question}`;
        block.appendChild(title);

        if (q.image) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');
            // Se asume que esta imagen contiene la red trófica de las fuentes para P28-P30
            imgContainer.innerHTML = `<p>Referencia a figura (Red Trófica):</p><img src="${q.image}" alt="Red Trófica Ecosistema">`;
            block.appendChild(imgContainer);
        }

        q.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');

            input.type = 'radio';
            input.name = `q${q.id}`;
            input.value = option;

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            block.appendChild(label);
        });

        quizForm.appendChild(block);
    });

    startTimer();
    renderAttemptHistory();
}

// --- GESTIÓN DEL TIEMPO ---

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isPaused = false;

    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                checkAnswers(true); 
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = !isPaused;
    const pauseButton = document.querySelector('.controls button');
    pauseButton.textContent = isPaused ? 'Reanudar' : 'Pausar';
    if (isPaused) {
        clearInterval(timerInterval);
    } else {
        startTimer();
    }
}

function resetTimer() {
    if (confirm("¿Estás seguro de que deseas reiniciar el examen? Se reiniciarán el tiempo y las respuestas.")) {
        clearInterval(timerInterval);
        timeLeft = TIME_LIMIT_MINUTES * 60;
        isPaused = false;
        updateTimerDisplay();
        document.querySelector('.controls button').textContent = 'Pausar';
        document.getElementById('quiz-form').reset();
        startTimer();
    }
}

// --- CÁLCULO DE PUNTAJE Y RESULTADO ---

function checkAnswers(timeExpired = false) {
    clearInterval(timerInterval);
    const form = document.getElementById('quiz-form');
    let correctCount = 0;
    const totalQuestions = questions.length;
    let feedbackHTML = '';

    questions.forEach(q => {
        const selectedInput = form.querySelector(`input[name="q${q.id}"]:checked`);
        const isCorrect = selectedInput && selectedInput.value === q.answer;

        if (isCorrect) {
            correctCount++;
        } else if (selectedInput) {
            feedbackHTML += `<p class="feedback-incorrect"><strong>P${q.id} Incorrecta (Seleccionó: ${selectedInput.value}):</strong> La respuesta correcta era: "${q.answer}".<br><em>Explicación: ${q.explanation}</em></p>`;
        } else {
             feedbackHTML += `<p class="feedback-incorrect"><strong>P${q.id} Sin Respuesta:</strong> La respuesta correcta era: "${q.answer}".<br><em>Explicación: ${q.explanation}</em></p>`;
        }
    });

    const score = (correctCount / totalQuestions) * 100;
    const passed = score >= PASSING_SCORE_PERCENTAGE;
    const attemptNumber = saveAttempt(score, passed); // Guardar el intento
    
    displayResult(score, correctCount, totalQuestions, feedbackHTML, timeExpired, attemptNumber);
    renderAttemptHistory(); // Actualizar el historial visible
}

function displayResult(score, correctCount, totalQuestions, feedbackHTML, timeExpired, attemptNumber) {
    const modal = document.getElementById('result-modal');
    const title = document.getElementById('modal-title');
    const scoreP = document.getElementById('modal-score');
    const statusP = document.getElementById('modal-status');
    const attemptP = document.getElementById('modal-attempts');
    const feedbackP = document.getElementById('modal-feedback');

    const passed = score >= PASSING_SCORE_PERCENTAGE;

    title.textContent = timeExpired ? '¡Tiempo Agotado! (Resultado Final)' : (passed ? '¡Aprobado!' : '¡Desaprobado!');
    title.className = passed ? 'passed' : 'failed';
    
    scoreP.textContent = `Obtuvo ${correctCount} de ${totalQuestions} respuestas correctas.`;
    statusP.textContent = `Puntaje: ${score.toFixed(2)}% (Requerido: ${PASSING_SCORE_PERCENTAGE}%)`;
    attemptP.textContent = `Este fue su Intento Número: ${attemptNumber}.`;

    if (!passed || timeExpired) {
        feedbackP.innerHTML = '<h3>Retroalimentación de Respuestas Erróneas/Faltantes:</h3>' + feedbackHTML;
    } else {
        feedbackP.innerHTML = '<p>¡Excelente! Ha superado el umbral de aprobación.</p>';
    }

    modal.style.display = 'block';

    document.querySelector('.close-button').onclick = function() { modal.style.display = 'none'; }
    window.onclick = function(event) {
        if (event.target == modal) { modal.style.display = 'none'; }
    }
}

// Inicializar el examen
window.onload = renderQuiz;