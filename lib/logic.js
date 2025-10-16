export default class Tanulo {
  static targetBudget = 0;
  static tanulok = [];

  constructor(budget, ido) {
    this.budget = budget;
    this.kiadas = 0;
    this.ido = ido;
    Tanulo.tanulok.push(this);
  }

  increment(x) {
    this.kiadas += x;
    const d = -Math.min(0, this.budget - this.kiadas);
    this.kiadas = Math.min(this.kiadas, this.budget);
    return d || null;
  }

  toString() {
    return `Tanulo: 
    \t zsebpénz : ${this.budget}
    \t kiadás (összes) : ${this.kiadas}
    \t kiadás (havonta) : ${Math.round(this.kiadas / this.ido)}`;
  }

  static getAllBudget() {
    return Tanulo.tanulok.reduce((sum, t) => sum + t.budget, 0);
  }

  static show() {
    Tanulo.tanulok.forEach((t) => console.log(t.toString()));
  }

  static reset() {
    Tanulo.tanulok = [];
  }

  static calc(target, kedvezmeny) {
    if (Tanulo.getAllBudget() < target) {
      throw new Error("Az összeg túl kevés!");
    }

    Tanulo.tanulok.forEach((t) => (t.kiadas = 0));
    let tanulok = [...Tanulo.tanulok];
    Tanulo.targetBudget = target - kedvezmeny * tanulok.length;
    const pending = [];

    while (Tanulo.targetBudget > 0.0001) {
      // to prevent infinite loops with floats
      tanulok = tanulok.filter((t) => !pending.includes(t));
      const osszeg = Tanulo.targetBudget / tanulok.length;

      for (const tanulo of tanulok) {
        Tanulo.targetBudget -= osszeg;
        const maradek = tanulo.increment(osszeg);
        if (maradek) {
          Tanulo.targetBudget += maradek;
          pending.push(tanulo);
        }
      }

      if (tanulok.length === 0) break;
    }
  }
}

// ---------- helper functions ----------

const sliceChr = ", ";

function ftFilter(x, t = (x) => x) {
  return t(String(x).split("ft")[0]);
}

// ---------- interactive version for Node ----------
// (You can remove this and use React Native inputs instead)

// async function main() {
//   const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const ask = (q) =>
//     new Promise((res) => readline.question(q, (ans) => res(ans)));

//   const targetBudget = parseInt(
//     ftFilter(
//       await ask("a kirándulás teljes költsége (összesen, ft) : "),
//       parseInt
//     )
//   );
//   const peopleNum = parseInt(await ask("résztvevők száma (fő) : "));
//   const kedvezmeny =
//     parseInt(
//       ftFilter(
//         await ask("van-e kedvezményes belépő, ha van akkor mennyi? (ft) "),
//         parseInt
//       )
//     ) || 0;
//   const ido =
//     parseInt(await ask("mennyi idő van még hátra (hónapban) : ")) || 0;

//   console.log("a rendelkezésre álló „zsebpénz” fejenként  : ");
//   const budgets = [];
//   for (let i = 0; i < peopleNum; i++) {
//     const b = parseInt(ftFilter(await ask(`${i + 1}. fő : `), parseInt));
//     budgets.push(b);
//   }

//   const diff = targetBudget / budgets.length;

//   budgets.forEach((b) => new Tanulo(b, ido));

//   try {
//     Tanulo.calc(targetBudget, kedvezmeny);
//     console.log(`\nCél összeg : ${targetBudget}`);
//     console.log(`1 főre jutó alap összeg : ${diff}\n`);
//     Tanulo.show();
//   } catch (e) {
//     console.error(e.message);
//   }

//   readline.close();
// }

// Uncomment this to test in Node
// main();
