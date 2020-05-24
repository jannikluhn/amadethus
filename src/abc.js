// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "main", "symbols": ["measure"], "postprocess": id},
    {"name": "measure$ebnf$1", "symbols": []},
    {"name": "measure$ebnf$1$subexpression$1", "symbols": ["chord"], "postprocess": id},
    {"name": "measure$ebnf$1$subexpression$1", "symbols": ["singleNoteChord"], "postprocess": id},
    {"name": "measure$ebnf$1", "symbols": ["measure$ebnf$1", "measure$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "measure", "symbols": ["measure$ebnf$1"], "postprocess": id},
    {"name": "chord$ebnf$1", "symbols": ["note"]},
    {"name": "chord$ebnf$1", "symbols": ["chord$ebnf$1", "note"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chord", "symbols": [{"literal":"["}, "chord$ebnf$1", {"literal":"]"}], "postprocess": ([_1, n, _2]) => n},
    {"name": "singleNoteChord", "symbols": ["note"]},
    {"name": "note$ebnf$1", "symbols": ["noteLength"], "postprocess": id},
    {"name": "note$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "note", "symbols": ["notePitch", "note$ebnf$1"], "postprocess": 
        function (d) {
          return {
            pitchClass: d[0]["pitchClass"],
            accidental: d[0]["accidental"],
            octave: d[0]["octave"],
            length: d[1] || 1
          }
        }
        },
    {"name": "notePitch$subexpression$1", "symbols": ["note4"]},
    {"name": "notePitch$subexpression$1", "symbols": ["note5"]},
    {"name": "notePitch", "symbols": ["accidental", "notePitch$subexpression$1", "changeOctaves"], "postprocess": 
        function(d) {
          return {
            pitchClass: d[1][0]["pitchClass"],
            accidental: d[0],
            octave: d[1][0]["octave"] + d[2]
          }
        }
        },
    {"name": "noteLength", "symbols": ["multLength"], "postprocess": id},
    {"name": "noteLength", "symbols": ["halveLengths"], "postprocess": id},
    {"name": "noteLength", "symbols": ["divLength"], "postprocess": id},
    {"name": "note4", "symbols": [/[A-G]/], "postprocess": ([n]) => ({pitchClass: n.toLowerCase(), octave: 4})},
    {"name": "note5", "symbols": [/[a-g]/], "postprocess": ([n]) => ({pitchClass: n, octave: 5})},
    {"name": "accidental$ebnf$1", "symbols": [/[\^_=]/], "postprocess": id},
    {"name": "accidental$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "accidental", "symbols": ["accidental$ebnf$1"], "postprocess": ([a]) => a || ""},
    {"name": "changeOctaves$ebnf$1", "symbols": []},
    {"name": "changeOctaves$ebnf$1", "symbols": ["changeOctaves$ebnf$1", "changeOctave"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "changeOctaves", "symbols": ["changeOctaves$ebnf$1"], "postprocess": ([ns]) => ns.reduce((a, b) => a + b, 0)},
    {"name": "changeOctave", "symbols": ["decOctave"], "postprocess": id},
    {"name": "changeOctave", "symbols": ["incOctave"], "postprocess": id},
    {"name": "decOctave", "symbols": [{"literal":","}], "postprocess": (_ => -1)},
    {"name": "incOctave", "symbols": [{"literal":"'"}], "postprocess": (_ => 1)},
    {"name": "multLength", "symbols": ["int"], "postprocess": ([n]) => parseInt(n)},
    {"name": "divLength", "symbols": [{"literal":"/"}, "int"], "postprocess": ([_, n]) => 1 / parseInt(n)},
    {"name": "halveLengths$ebnf$1", "symbols": ["halveLength"]},
    {"name": "halveLengths$ebnf$1", "symbols": ["halveLengths$ebnf$1", "halveLength"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "halveLengths", "symbols": ["halveLengths$ebnf$1"], "postprocess": ([ds]) => Math.pow(0.5, ds.length)},
    {"name": "halveLength", "symbols": [{"literal":"/"}], "postprocess": ([_]) => 0.5}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
