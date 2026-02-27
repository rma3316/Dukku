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

$lib.Classic.roundReady = function (data) {
	var i, len = $data.room.game.title.length;
	var $l;

	clearBoard();
	$data._roundTime = $data.room.time * 1000;
	$stage.game.display.empty().append(getCharObject(data.char, data.subChar));
	$stage.game.chain.show().text($data.chain = 0);
	if ($data.room.opts.mission) {
		$stage.game.items.show().css('opacity', 1).text($data.mission = data.mission);
	}
	if (MODE[$data.room.mode] == "KAP") {
		$(".jjoDisplayBar .graph-bar").css({ 'float': "right", 'text-align': "left" });
	}
	drawRound(data.round);
	playSound('round_start');
	recordEvent('roundReady', { data: data });
};
$lib.Classic.turnStart = function (data) {
	$data.room.game.turn = data.turn;
	if (data.seq) $data.room.game.seq = data.seq;
	if (!($data._tid = $data.room.game.seq[data.turn])) return;
	if ($data._tid.robot) $data._tid = $data._tid.id;
	data.id = $data._tid;

	$data._char_obj = getCharObject(data.char, data.subChar, data.wordLength);
	$stage.game.display.empty().append($data._char_obj);
	$data._char = (data.char + (data.subChar ? ("(" + data.subChar + ")") : ""));
	$("#game-user-" + data.id).addClass("game-user-current");
	if (!$data._replay) {
		$stage.game.here.css('display', (data.id == $data.id) ? "block" : "none");
		if (data.id == $data.id) {
			if (mobile) $stage.game.hereText.val("").focus();
			else $stage.talk.focus();
		}
	}
	$stage.game.items.text($data.mission = data.mission);

	ws.onmessage = _onMessage;
	clearInterval($data._tTime);
	clearTrespasses();
	$data._chars = [data.char, data.subChar];
	$data._speed = data.speed;
	$data._tTime = addInterval(turnGoing, TICK);
	$data.turnTime = data.turnTime;
	$data._turnTime = data.turnTime;
	$data._roundTime = data.roundTime;
	$data._turnSound = playSound("T" + data.speed);
	recordEvent('turnStart', {
		data: data
	});
};
$lib.Classic.turnGoing = function () {
	if (!$data.room) clearInterval($data._tTime);
	$data._turnTime -= TICK;
	$data._roundTime -= TICK;

	$stage.game.turnBar
		.width($data._timePercent())
		.text(($data._turnTime * 0.001).toFixed(1) + L['SECOND']);
	$stage.game.roundBar
		.width($data._roundTime / $data.room.time * 0.1 + "%")
		.text(($data._roundTime * 0.001).toFixed(1) + L['SECOND']);

	if (!$stage.game.roundBar.hasClass("round-extreme")) if ($data._roundTime <= 5000) $stage.game.roundBar.addClass("round-extreme");
};
$lib.Classic.turnEnd = function (id, data) {
	var $sc = $("<div>")
		.addClass("deltaScore")
		.text((data.score > 0) ? ("+" + (data.score - data.bonus)) : data.score);
	var $uc = $(".game-user-current");
	var hi;

	if ($data._turnSound) $data._turnSound.stop();
	addScore(id, data.score);
	clearInterval($data._tTime);
	if (data.ok) {
		checkFailCombo();
		clearTimeout($data._fail);
		$stage.game.here.hide();
		$stage.game.chain.text(++$data.chain);
		pushDisplay(data.value, data.mean, data.theme, data.wc);
	} else {
		checkFailCombo(id);
		$sc.addClass("lost");
		$(".game-user-current").addClass("game-user-bomb");
		$stage.game.here.hide();
		playSound('timeout');
	}
	if (data.hint) {
		data.hint = data.hint._id;
		hi = data.hint.indexOf($data._chars[0]);
		if (hi == -1) hi = data.hint.indexOf($data._chars[1]);

		if (MODE[$data.room.mode] == "KAP") $stage.game.display.empty()
			.append($("<label>").css('color', "#AAAAAA").text(data.hint.slice(0, hi)))
			.append($("<label>").text(data.hint.slice(hi)));
		else $stage.game.display.empty()
			.append($("<label>").text(data.hint.slice(0, hi + 1)))
			.append($("<label>").css('color', "#AAAAAA").text(data.hint.slice(hi + 1)));
	}
	if (data.bonus) {
		mobile ? $sc.html("+" + (b.score - b.bonus) + "+" + b.bonus) : addTimeout(function () {
			var $bc = $("<div>")
				.addClass("deltaScore bonus")
				.text("+" + data.bonus);

			drawObtainedScore($uc, $bc);
		}, 500);
	}
	drawObtainedScore($uc, $sc).removeClass("game-user-current");
	updateScore(id, getScore(id));
};
