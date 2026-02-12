define(['knockout'], function(ko) {
  'use strict';

  function QueueRunner(opts) {
    opts = opts || {};

    this.queue = opts.queue;                 // ko.observableArray
    this.maxParallel = opts.maxParallel;     // ko.observable
    this.processItem = opts.processItem;     // function(item) => Promise
    this.onDrain = opts.onDrain || null;     // function() => (Promise|void)

    this.activeCount = ko.observable(0);

    this._drainedOnce = false;
  }

  QueueRunner.prototype._hasActive = function() {
    var q = (this.queue && this.queue()) ? this.queue() : [];
    for (var i = 0; i < q.length; i++) {
      var st = q[i] && q[i].statusObs ? q[i].statusObs() : null;
      if (st === 'queued' || st === 'uploading' || st === 'processing') return true;
    }
    return false;
  };

  QueueRunner.prototype._nextQueued = function() {
    var q = (this.queue && this.queue()) ? this.queue() : [];
    for (var i = 0; i < q.length; i++) {
      var it = q[i];
      if (it && it.statusObs && it.statusObs() === 'queued') return it;
    }
    return null;
  };

  QueueRunner.prototype.run = function() {
    var self = this;

    while (self.activeCount() < (self.maxParallel ? self.maxParallel() : 1)) {
      var next = self._nextQueued();
      if (!next) break;

      (function(item) {
        self.activeCount(self.activeCount() + 1);

        Promise.resolve()
          .then(function() { return self.processItem(item); })
          .catch(function(err) {
            // processItem powinien sam oznaczyć failed, tu tylko log
            console.error('[IIIF QUEUE] processItem error:', err);
          })
          .finally(function() {
            self.activeCount(self.activeCount() - 1);
            self.run();
          });
      })(next);
    }

    // Drain: gdy nic nie jest queued/uploading/processing i mamy jakieś itemy
    if (!self._hasActive()) {
      var qAll = (self.queue && self.queue()) ? self.queue() : [];
      if (qAll.length > 0 && !self._drainedOnce && typeof self.onDrain === 'function') {
        self._drainedOnce = true;
        Promise.resolve()
          .then(function() { return self.onDrain(); })
          .catch(function(err) { console.error('[IIIF QUEUE] onDrain error:', err); });
      }
    }
  };

  QueueRunner.prototype.resetDrain = function() {
    this._drainedOnce = false;
  };

  return QueueRunner;
});