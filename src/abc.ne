@builtin "number.ne"

main -> measure {% id %}

measure -> (chord {% id %} | singleNoteChord {% id %} ):* {% id %}

chord -> "[" note:+ "]" {% ([_1, n, _2]) => n %}
singleNoteChord -> note

note -> notePitch noteLength:? {%
  function (d) {
    return {
      pitchClass: d[0]["pitchClass"],
      accidental: d[0]["accidental"],
      octave: d[0]["octave"],
      length: d[1] || 1
    }
  }
%}
notePitch -> accidental (note4 | note5) changeOctaves  {%
  function(d) {
    return {
      pitchClass: d[1][0]["pitchClass"],
      accidental: d[0],
      octave: d[1][0]["octave"] + d[2]
    }
  }
%}
noteLength -> multLength {% id %} | halveLengths {% id %} | divLength {% id %}

# pitch
note4 -> [A-G] {% ([n]) => ({pitchClass: n.toLowerCase(), octave: 4}) %}
note5 -> [a-g] {% ([n]) => ({pitchClass: n, octave: 5}) %}
accidental -> [\^_=]:? {% ([a]) => a || "" %}

changeOctaves -> changeOctave:* {% ([ns]) => ns.reduce((a, b) => a + b, 0) %}
changeOctave -> decOctave {% id %} | incOctave {% id %}
decOctave -> "," {% (_ => -1) %}
incOctave -> "'" {% (_ => 1) %}

# length
multLength -> int {% ([n]) => parseInt(n) %}
divLength -> "/" int {% ([_, n]) => 1 / parseInt(n) %}
halveLengths -> halveLength:+ {% ([ds]) => Math.pow(0.5, ds.length) %}
halveLength -> "/" {% ([_]) => 0.5 %}
