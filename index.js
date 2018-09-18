var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions
	self.init_presets();
	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
	self.init_tcp();
	self.init_presets();
};

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;

	self.status(self.STATE_UNKNOWN);
	self.init_presets();
	self.init_tcp();
};

instance.prototype.init_tcp = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	if (self.config.host) {
		self.socket = new tcp(self.config.host, 4999);

		self.socket.on('status_change', function (status, message) {
			self.status(status, message);
		});

		self.socket.on('error', function (err) {
			debug("Network error", err);
			self.log('error',"Network error: " + err.message);
		});
	}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type:  'textinput',
			id:    'host',
			label: 'Device IP',
			width: 12,
			regex: self.REGEX_IP,
		},
		{
			type:  'text',
			id:    'info',
			width: 12,
			label: 'Information',
			value: 'This module controls an itac IP2SL device by <a href="https://www.globalcache.com/products/itach/ip2slspecs/" target="_new">Global Cache</a>.'
		},
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);;
};

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];

		presets.push({
			category: 'Kramer VP-728',
			label: 'Input 1',
			bank: {
				style: 'text',
				text: 'INPUT 1',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 0'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Input 2',
			bank: {
				style: 'text',
				text: 'INPUT 2',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 1'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Input 3',
			bank: {
				style: 'text',
				text: 'INPUT 3',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 2'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Input 4',
			bank: {
				style: 'text',
				text: 'INPUT 4',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 3'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'VGA 1',
			bank: {
				style: 'text',
				text: 'VGA 1',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 4'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'VGA 2',
			bank: {
				style: 'text',
				text: 'VGA 2',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 5'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'HDMI 1',
			bank: {
				style: 'text',
				text: 'HDMI 1',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 6'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'HDMI 2',
			bank: {
				style: 'text',
				text: 'HDMI 2',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 0 7'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Blank On',
			bank: {
				style: 'text',
				text: 'BLANK\\nON',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 90 1'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Blank Off',
			bank: {
				style: 'text',
				text: 'BLANK\\nOFF',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 90 0'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Freeze On',
			bank: {
				style: 'text',
				text: 'FREEZE\\nON',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 89 9'
					}
				}
			]
		});

		presets.push({
			category: 'Kramer VP-728',
			label: 'Freeze Off',
			bank: {
				style: 'text',
				text: 'FREEZE\\nOFF',
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [
				{
					action: 'command',
					options: {
						sl: 'Y 0 89 0'
					}
				}
			]
		});

	self.setPresetDefinitions(presets);
}

instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {

		'command':       {
			label: 'Command',
			options: [
				{
					 type:    'textinput',
					 label:   'Text String',
					 id:      'sl'
				}
			]
		}
	});
}

instance.prototype.action = function(action) {
	var self = this;
	var cmd  = '';
	var opt  = action.options;

	switch (action.action) {

		case 'command':
			cmd += action.options.sl;
			break;

	}

	if (cmd !== undefined) {

		debug('sending tcp', cmd, "to", self.config.host);

		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd + "\r\n");
		} else {
			debug('Socket not connected :(');
		}

	}

	debug('action():', action);


};

instance.module_info = {
	label:   'Global Cache - iTach IP2SL',
	id:      'globalcache-itac-sl',
	version: '1.2.0'
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
