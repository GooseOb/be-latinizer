import { describe, expect, test } from "bun:test";
import { transformContent } from "./transform-content";

const getLabel = (inputType: string) =>
  `\x1b[35m%${inputType}\x1b[0;2m -> \x1b[0;1m%s`;

const testOnCases = <TInput, TOutput extends string>(
  name: string,
  fn: (arg: TInput) => TOutput,
  cases: readonly (readonly [TInput, TOutput])[],
  label = getLabel("s"),
) => {
  describe(name, () => {
    test.each(cases)(label, (input, expected) => {
      expect(fn(input)).toBe(expected);
    });
  });
};

testOnCases("transform-content", transformContent, [
  ["пры інстытуце", "pry jinstytucie"],
  ["поіць", "pojić"],
  ["вераб’і", "vierabji"],
  ["у ім", "u jim"],
  ["іста", "jista"],
  ["Іншы ў ігрушы", "Jinšy ů jihrušy"],
  ["яна із мною", "jana iz mnoju"],
  ["побач ізь ім", "pobač iź jim"],
  ["церазь ямы", "cieraź jamy"],
  ["ня йснуе Іры", "nia jsnuje Jiry"],
  ["маленькія іклы", "maleńkija jikły"],
  ["бязь зьвесткаў", "biaź źviestkaů"],
  ["з імною", "z imnoju"],
  ["яна йдзе зь ім паіць коні", "jana jdzie ź jim pajić koni"],
  ["мая інфармацыя", "maja jinfarmacyja"],
  ["была ізь Сьвятлом", "była iź Śviatłom"],
  ["Харошы", "Charošy"],
  ["знайшлі ...", "znajšli ..."],
  ["ні слуху ...", "ni słuchu ..."],
  ["пралезьці ...", "praleźci ..."],
  [">Я ня маю ...", ">Ja nia maju ..."],
  ["ext>Я Фанат, ...", "ext>Ja Fanat, ..."],
  ["ісьці забаронена ...", "iści zabaroniena ..."],
  ["сталкеру. І мы", "stałkieru. I my"],
  ["У іх", "U jich"],
  ["цалкам іншы,", "całkam jinšy,"],
  ["вачох іхных", "vačoch jichnych"],
  ["... і іншае", "... i jinšaje"],
  [">Я 032, уцяміў", ">Ja 032, uciamiů"],
  ["КАІР", "KAJIR"],
  [". Імаверна", ". Imavierna"],
  ["Я Інфарматар", "Ja Jinfarmatar"],
  ["<lia>а</lia>", "<lia>a</lia>"],
  ["залежыць,\\nяк да", "zaležyć,\\njak da"],
  ["сюды,\\nё цікавыя", "siudy,\\njo cikavyja"],
]);
