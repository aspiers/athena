import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs';
chai.use(chaiAsPromised);
const assert = chai.assert;

import { LuaAnalyzer, LuaSuggester } from '../../src/lua';
import { SuggestionKind } from '../../src/model';

describe("Suggestion for table", () => {

  const filePath = __dirname + "/resources/table.lua";
  const source = fs.readFileSync(filePath, "utf8");
  const luaAnalyzer = new LuaAnalyzer();
  const luaSuggester = new LuaSuggester();

  describe("Suggestion for simple field", () => {

    const index = 250;

    it("FieldTable.", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FieldTable.", index);
      assert.equal(suggestions.length, 5);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 5);
    });

    it("FieldTable.f", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FieldTable.f", index);
      assert.equal(suggestions.length, 4);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 4);
    });

    it("FieldTable2.f", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FieldTable2.f", index);
      assert.equal(suggestions.length, 2);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 2);
    });

  });

  describe("Suggestion for function field", () => {

    const index = 733;

    it("FuncTable.", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FuncTable.", index);
      assert.equal(suggestions.length, 5);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 5);
    });

    it("FuncTable.s", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FuncTable.s", index);
      assert.equal(suggestions.length, 1);
      assert.equal(suggestions.filter(s => SuggestionKind.Member == s.kind).length, 1);
    });

    it("FuncTable.m", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FuncTable.m", index);
      assert.equal(suggestions.length, 3);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 3);
    });

    it("FuncTable.d", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "FuncTable.d", index);
      assert.equal(suggestions.length, 1);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 1);
    });

  });

  describe("Suggestion for nested field", () => {

    const index = 1093;

    it("NestedTable.", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "NestedTable.", index);
      assert.equal(suggestions.length, 2);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 2);
    });

    it("NestedTable.field2.", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "NestedTable.field2.", index);
      assert.equal(suggestions.length, 5);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 5);
    });

    it("NestedTable.field2.m", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "NestedTable.field2.m", index);
      assert.equal(suggestions.length, 1);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 1);
    });

  });

  describe("Suggestion for imported table field", () => {

    const index = 1093;

    it("libraryTable.", async () => {
      const analysisInfos = await luaAnalyzer.analyze(source, filePath);
      const suggestions = await luaSuggester.suggest(analysisInfos, "libraryTable.", index);
      assert.equal(suggestions.length, 2);
      assert.equal(suggestions.filter(s => SuggestionKind.Member === s.kind).length, 2);
    });

  });

});