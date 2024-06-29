//var System = importNamespace('System');

// Опции
var EndOfMatchTime = 10;

// Константы
var GameStateValue = "Game";
var EndOfMatchStateValue = "EndOfMatch";
var EndAreaTag = "parcourend"; 	// тэг зоны конца паркура
var SpawnAreasTag = "spawn";	// тэг зон промежуточных спавнов
var EndTriggerPoints = 1000;	// сколько дается очков за завершение маршрута
var CurSpawnPropName = "CurSpawn"; // свойство, отвечающее за индекс текущего спавна 0 - дефолтный спавн
var ViewSpawnsParameterName = "ViewSpawns";	// параметр создания комнаты, отвечающий за визуализацию спавнов
var ViewEndParameterName = "ViewEnd";	// параметр создания комнаты, отвечающий за визуализацию конца маршрута
var MaxSpawnsByArea = 25;	// макс спавнов на зону
var LeaderBoardProp = "Leader"; // свойство для лидерборда

// Постоянные, переменны
var mainTimer = Timers.GetContext().Get("Main"); 		// таймер конца игры
var endAreas = AreaService.GetByTag(EndAreaTag);		// зоны конца игры
var spawnAreas = AreaService.GetByTag(SpawnAreasTag);	// зоны спавнов
var stateProp = Properties.GetContext().Get("State");	// свойство состояния
var inventory = Inventory.GetContext();					// контекст инвентаря

// Параметры, режима
Properties.GetContext().GameModeName.Value = "GameModes/Parcour";
Damage.FriendlyFire = false;
Map.Rotation = GameMode.Parameters.GetBool("MapRotation");
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameters.GetBool("PartialDesruction");
BreackGraph.WeakBlocks = GameMode.Parameters.GetBool("LoosenBlocks");

// Запрещаем всё, в руках
var inventory = Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;

// Создаём, команду
Teams.Add("Blue", "Teams/Blue", new Color(0, 0, 1, 0));
var BlueTeam = Teams.Get("Blue");
BlueTeam.Spawns.SpawnPointsGroups.Add(1);
BlueTeam.Spawns.RespawnTime.Value = 0;

// Выводим, подсказку
Ui.GetContext().Hint.Value = "Hint/GoParcour";

// Настройки игрового, состояние
stateProp.OnValue.Add(OnState);
function OnState() {
	switch (stateProp.Value) {
		case GameStateValue:
			var spawns = Spawns.GetContext();
			spawns.enable = true;
			break;
		case EndOfMatchStateValue:
			// Дэспавн
			var spawns = Spawns.GetContext();
			spawns.enable = false;
			spawns.Despawn();
			Game.GameOver(LeaderBoard.GetPlayers());
			mainTimer.Restart(EndOfMatchTime);
			// Говорим, кто выиграл
			break;
	}
}

// Визуализируем конец, маршрута
if (GameMode.Parameters.GetBool(ViewEndParameterName)) {
	var endView = AreaViewService.GetContext().Get("EndView");
	endView.Color = gnmeEndAreaColor;
	endView.Tags = [EndAreaTag];
	endView.Enable = true;
}

// Визуализируем промежуточные спавны, маршрута
if (GameMode.Parameters.GetBool(ViewSpawnsParameterName)) {
	var spawnsView = AreaViewService.GetContext().Get("SpawnsView");
	spawnsView.Color = areaColor;
	spawnsView.Tags = [SpawnAreasTag];
	spawnsView.Enable = true;
}

// Настраиваем триггер, конца игры
var endTrigger = AreaPlayerTriggerService.Get("EndTrigger");
endTrigger.Tags = [EndAreaTag];
endTrigger.Enable = true;
endTrigger.OnEnter.Add(function (player) {
	endTrigger.Enable = false;
	player.Properties.Get(LeaderBoardProp).Value += 1000;
	stateProp.Value = EndOfMatchStateValue;
});

// Настраиваем триггер, спавнов
var spawnTrigger = AreaPlayerTriggerService.Get("SpawnTrigger");
spawnTrigger.Tags = [SpawnAreasTag];
spawnTrigger.Enable = true;
spawnTrigger.OnEnter.Add(function (player, area) {
	if (spawnAreas == null || spawnAreas.length == 0) InitializeMap(); // todo костыль изза бага (не всегда прогружает нормально)	
	if (spawnAreas == null || spawnAreas.length == 0) return;
	var prop = player.Properties.Get(CurSpawnPropName);
	var startIndex = 0;
	if (prop.Value != null) startIndex = prop.Value;
	for (var i = startIndex; i < spawnAreas.length; ++i) {
		if (spawnAreas[i] == area) {
			var prop = player.Properties.Get(CurSpawnPropName);
			if (prop.Value == null || i > prop.Value) {
				prop.Value = i;
				player.Properties.Get(LeaderBoardProp).Value += 1;
			}
			break;
		}
	}
});

// Настройка таймера, конца игры
mainTimer.OnTimer.Add(function () { Game.RestartGame(); });

// Создаём, лидерборд
LeaderBoard.PlayerLeaderBoardValues = [
	{
		Value: "Deaths",
		DisplayName: "Statistics/Deaths",
		ShortDisplayName: "Statistics/DeathsShort"
	},
	{
		Value: LeaderBoardProp,
		DisplayName: "Statistics/Scores",
		ShortDisplayName: "Statistics/ScoresShort"
	}
];
// Сортировка команд
LeaderBoard.TeamLeaderBoardValue = {
	Value: LeaderBoardProp,
	DisplayName: "Statistics\Scores",
	ShortDisplayName: "Statistics\Scores"
};
// Сортировка проходящих
LeaderBoard.PlayersWeightGetter.Set(function (player) {
	return player.Properties.Get(LeaderBoardProp).Value;
});
// Счётчик, смертей
Damage.OnDeath.Add(function (player) {
	++player.Properties.Deaths.Value;
});

// Разрешение, в команду
Teams.OnRequestJoinTeam.Add(function (player, team) { team.Add(player); });
// Разрешение, на спавн
Teams.OnPlayerChangeTeam.Add(function (player) { player.Spawns.Spawn() });

// Счётчик, спавнов
Spawns.OnSpawn.Add(function (player) {
	++player.Properties.Spawns.Value;
});

// Инициализация всего что зависит, от карты
Map.OnLoad.Add(InitializeMap);
function InitializeMap() {
	endAreas = AreaService.GetByTag(EndAreaTag);
	spawnAreas = AreaService.GetByTag(SpawnAreasTag);
	//log.debug("spawnAreas.length=" + spawnAreas.length);
	// Ограничитель
	if (spawnAreas == null || spawnAreas.length == 0) return;
	// Сортировка, зон
	spawnAreas.sort(function (a, b) {
		if (a.Name > b.Name) return 1;
		if (a.Name < b.Name) return -1;
		return 0;
	});
}
InitializeMap();

// При смене свойства индекса спавна, задаем спавн
Properties.OnPlayerProperty.Add(function (context, prop) {
	if (prop.Name != CurSpawnPropName) return;
	//log.debug(context.Player + " spawn point is " + prop.Value);
	SetPlayerSpawn(context.Player, prop.Value);
});

function SetPlayerSpawn(player, index) {
	var spawns = Spawns.GetContext(player);
	// Очистка, спавнов
	spawns.CustomSpawnPoints.Clear();
	// Если нет захвата, то сброс спавнов
	if (index < 0 || index >= spawnAreas.length) return;
	// Задаём, спавны
	var area = spawnAreas[index];
	var iter = area.Ranges.GetEnumerator();
	iter.MoveNext();
	var range = iter.Current;
	// Определяем, куда смотреть спавнам
	var lookPoint = {};
	if (index < spawnAreas.length - 1) lookPoint = spawnAreas[index + 1].Ranges.GetAveragePosition();
	else {
		if (endAreas.length > 0)
			lookPoint = endAreas[0].Ranges.GetAveragePosition();
	}

	//log.debug("range=" + range);
	var spawnsCount = 0;
	for (var x = range.Start.x; x < range.End.x; x += 2)
		for (var z = range.Start.z; z < range.End.z; z += 2) {
			spawns.CustomSpawnPoints.Add(x, range.Start.y, z, Spawns.GetSpawnRotation(x, z, lookPoint.x, lookPoint.z));
			++spawnsCount;
			if (spawnsCount > MaxSpawnsByArea) return;
		}
}

// Запуск, игры
stateProp.Value = GameStateValue;
