var should = require("should")
var bbb = require("babelsbergjs-core");
var bbb_csp = require("../csp_ext.js");

require('./test_harness')
console.log = require('./filtered_log')

describe('bbb_csp', function() {
  describe('properties', function() {
    it('contain Solver.', function() {
      bbb_csp.should.have.property('Solver')
        .which.is.a.Solver;
    }); 
  });

  xit('BacktalkPaperExample', function () {
    bbb.defaultSolvers = [ new bbb_csp.Solver() ];
    var solver = new bbb_csp.Solver();

    var man = {
      shoes: "foo",
      shirt: "foo",
      pants: "foo",
      hat: "foo"
    };
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.shoes.is in ["brown", "black"];;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.shirt.is in ["brown", "blue", "white"];;
    });
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.pants.is in ["brown", "blue", "black", "white"];;
    });
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.hat.is in ["brown"];;
    });
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.shoes === man.hat;;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.shoes !== man.pants;;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.shoes !== man.shirt;;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        man: man,
        _$_self: this.doitContext || this
      }
    }, function() {
      return man.shirt !== man.pants;;
    });

    (man.hat === "brown").should.be.equal(true, "hat's domain is restricted to 'brown' only");
    (man.shoes === "brown").should.be.equal(true, "shoes have to be 'brown'");
    (man.shirt === "blue" || man.shirt === "white").should.be.equal(true, "shirt has to be 'blue' or 'white'");
    (man.shirt !== man.pants).should.be.equal(true, "shirt and pants must not have the same color");
    (man.pants === "black" || man.pants === "blue" || man.pants === "white").should.be.equal(true, "pants should be 'black', 'blue' or 'white'");
  });

  it('ForceToDomain', function () {
    bbb.defaultSolvers = [ new bbb_csp.Solver() ];
    var solver = new bbb_csp.Solver();
    var pt = {x: 5, y: 2};
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [1, 2, 3];;
    });

    ([1, 2, 3].indexOf(pt.x) > -1).should.be.equal(true, "x is not in its domain [1, 2, 3], but " + pt.x);
  });

  xit('RemainIfInDomain', function () {
    bbb.defaultSolvers = [ new bbb_csp.Solver() ];
    var solver = new bbb_csp.Solver();

    var solver = bbb.defaultSolver = new bbb_csp.Solver();
    var pt = {x: 5, y: 2};
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [4, 5, 6];;
    });

    (pt.x === 5).should.be.equal(true, "x does not stay at 5, but probably raims in its domain [4, 5, 6]; x: " + pt.x);
  });

  xit('ErrorOnEmptyDomain', function () {
    var solver = bbb.defaultSolver = new bbb_csp.Solver(),
      pt = {x: 5, y: 2},
      errorThrown = false;
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [];;
    });
    try {
      solver.newVariable(pt, "x", []);
    } catch (e) {
      errorThrown = true;
    }

    this.assert(errorThrown, "no error was thrown on empty domain");
  });

  xit('Assignment', function () {
    var solver = bbb.defaultSolver = new bbb_csp.Solver(),
      pt = {x: 2, y: 6},
      errorThrown = false;
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [1, 2, 3, 4, 5, 6, 7, 8, 9];;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.y.is in [4, 5, 6, 7, 8, 9, 10, 11, 12];;
    });
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x + 4 === pt.y;;
    });
  
    pt.x = 8;
    this.assert(pt.x === 8, "assignment 'x = 8' was not successful; x: " + pt.x);
    this.assert(pt.y === 12, "constraint 'x + 4 == y' not satisfied; y: " + pt.y);
    
    pt.y = 7;
    this.assert(pt.y === 7, "assignment 'y = 7' was not successful; y: " + pt.y);
    this.assert(pt.x === 3, "constraint 'x + 4 == y' not satisfied; x: " + pt.x);
  });

  xit('Assignment2', function () {
    var solver = bbb.defaultSolver = new bbb_csp.Solver(),
      pt = {x: 2, y: 8},
      errorThrown = false;
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [1, 2, 3, 4, 5, 6, 7, 8, 9];;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.y.is in [4, 5, 6, 7, 8, 9, 10, 11, 12];;
    });

    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x + pt.y >= 10;;
    });
  
    this.assert(pt.x + pt.y >= 10, "constraint 'pt.x + pt.y >= 10' does not hold for x: "+ pt.x+", y: " + pt.y);

    pt.y = 4;
    this.assert(pt.y === 4, "assignment 'y = 4' was not successful; y: " + pt.y);
    this.assert(pt.x + pt.y >= 10, "constraint 'pt.x + pt.y >= 10' does not hold for x: "+ pt.x+", y: " + pt.y);
  });

  xit('FailingAssignmentOnDomain', function () {
    var solver = bbb.defaultSolver = new bbb_csp.Solver(),
      pt = {x: 5, y: 2},
      errorThrown = false;
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [1, 2, 3];;
    });
    
    try {
      pt.x = 0;
    } catch (e) {
      errorThrown = true;
    }
  
    this.assert(errorThrown, "no error was thrown on new value x = 0 with domain [1, 2, 3]; x: " + pt.x);
  });

  xit('FailingAssignment', function () {
    // try x = 0 with constraint x > 4
    var solver = bbb.defaultSolver = new bbb_csp.Solver(),
      pt = {x: 2, y: 8},
      errorThrown = false;
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [1, 2, 3, 4, 5, 6, 7, 8, 9];;
    });
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.y.is in [1, 2, 3, 4, 5, 6, 7, 8, 9];;
    });
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x > 4;;
    });
  
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x + pt.y === 10;;
    });

    this.assert(pt.x > 4, "constraint 'pt.x  > 4' does not hold for x: "+ pt.x);
    this.assert(pt.x + pt.y === 10, "constraint 'pt.x + pt.y === 10' does not hold for x: "+ pt.x + ", y: " + pt.y);
  
    var oldValueX = pt.x;
    var oldValueY = pt.y;
    
    try {
      pt.y = 7;
    } catch (e) {
      errorThrown = true;
    }
    this.assert(errorThrown, "no error was thrown on new value y = 7 with constraints 'pt.x + pt.y === 10' and 'pt.x  > 4'; x: " + pt.x + ", y: " + pt.y);
    this.assert(pt.y === oldValueY, "old value of y not restored after failed assignment; currentY: " + pt.y + ", oldY: " + oldValueY);
    this.assert(pt.x === oldValueX, "old value of x not restored after failed assignment; currentX: " + pt.x + ", oldX: " + oldValueX);
  });

  xit('UnsatisfiableConstraint', function () {
    var solver = bbb.defaultSolver = new bbb_csp.Solver(),
      pt = {x: 5, y: 2},
      errorThrown = false;
    
    bbb.always({
      ctx: {
        bbb: bbb,
        csp: csp,
        solver: solver,
        pt: pt,
        _$_self: this.doitContext || this
      }
    }, function() {
      return pt.x.is in [1, 2, 3];;
    });
    
    try {
      bbb.always({
        ctx: {
          bbb: bbb,
          csp: csp,
          solver: solver,
          pt: pt,
          _$_self: this.doitContext || this
        }
      }, function() {
        return pt.x >= 5;;
      });
    } catch (e) {
      errorThrown = true;
    }
  
    this.assert(errorThrown, "no error was thrown on unsatisfiable constraint");
  });
});
