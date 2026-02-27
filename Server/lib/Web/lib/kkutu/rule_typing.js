/**
 * Rule the words! KKuTu Online
 * Copyright (C) 2017 JJoriping(op@jjo.kr)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

$lib.Typing.roundReady = function (data) {
	var i, len = $data.room.game.title.length;
	var $l;

	$data._chatter = mobile ? $stage.game.hereText : $stage.talk;
	clearBoard();
	$data._round = data.round;
	$data._roundTime = $data.room.time * 1000;
	$data._fastTime = 10000;
	$data._list = data.list.concat(data.list);
	$data.chain = 0;
	drawList();
	drawRound(data.round);
	playSound('round_start');
	recordEvent('roundReady', { data: data });
};
function onSpace(e) {
	if (e.keyCode == 32) {
		$stage.chatBtn.trigger('click');
		e.preventDefault();
	}
}
function drawList() {
	var wl = $data._list.slice($data.chain);
	var lv = $data.room.opts.proverb ? 1 : 5;
	var pts = "";
	var w0l = wl[0].length;

	if (w0l >= 20) pts = "18px";
	if (w0l >= 50) pts = "15px";
	$stage.game.display.css('font-size', pts).empty();

	// Display first words with highlighting for the current one
	wl.slice(0, lv).forEach(function (word, idx) {
		var $word = $("<span>");
		if (idx == 0) $word.css('color', "#FFFF44");
		$word.text(word + " ");
		$stage.game.display.append($word);
	});

	$stage.game.chain.show().text($data.chain);

	var $turnBar = $(".jjo-turn-time .graph-bar").width("100%").empty()
		.css({ 'text-align': "center", 'background-color': "#70712D" });

	wl.slice(lv, 2 * lv).forEach(function (word) {
		$turnBar.append($("<span>").text(word + " "));
	});
}
$lib.Typing.spaceOn = function () {
	if ($data.room.opts.proverb) return;
	$data._spaced = true;
	$("body").on('keydown', "#" + $data._chatter.attr('id'), onSpace);
};
$lib.Typing.spaceOff = function () {
	delete $data._spaced;
	$("body").off('keydown', "#" + $data._chatter.attr('id'), onSpace);
};
$lib.Typing.turnStart = function (data) {
	if (!$data._spectate) {
		$stage.game.here.show();
		if (mobile) $stage.game.hereText.val("").focus();
		else $stage.talk.val("").focus();
		$lib.Typing.spaceOn();
	}
	ws.onmessage = _onMessage;
	clearInterval($data._tTime);
	clearTrespasses();
	$data._tTime = addInterval(turnGoing, TICK);
	$data._roundTime = data.roundTime;
	playBGM('jaqwi');
	recordEvent('turnStart', {
		data: data
	});
};
$lib.Typing.turnGoing = $lib.Jaqwi.turnGoing;
$lib.Typing.turnEnd = function (id, data) {
	var $sc = $("<div>")
		.addClass("deltaScore")
		.text("+" + data.score);
	var $uc = $("#game-user-" + id);

	if (data.error) {
		$data.chain++;
		drawList();
		playSound('fail');
	} else if (data.ok) {
		if ($data.id == id) {
			$data.chain++;
			drawList();
			playSound('mission');
			pushHistory(data.value, "");
		} else if ($data._spectate) {
			playSound('mission');
		}
		addScore(id, data.score);
		drawObtainedScore($uc, $sc);
		updateScore(id, getScore(id));
	} else {
		clearInterval($data._tTime);
		$lib.Typing.spaceOff();
		$stage.game.here.hide();
		stopBGM();
		playSound('horr');
		addTimeout(drawSpeed, 1000, data.speed);
		if ($data._round < $data.room.round) restGoing(10);
	}
};
function restGoing(rest) {
	$(".jjo-turn-time .graph-bar")
		.text(rest + L['afterRun']);
	if (rest > 0) addTimeout(restGoing, 1000, rest - 1);
}
function drawSpeed(table) {
	var i;

	for (i in table) {
		$("#game-user-" + i + " .game-user-score").empty()
			.append($("<div>").css({ 'float': "none", 'color': "#4444FF", 'text-align': "center" }).text(table[i])
				.append($("<label>").css('font-size', "11px").text(L['kpm'])));
	}
}
