package VIIRS

type ChannelParameters struct {
	APID                  uint16
	ChannelName           string
	AggregationZoneWidth  [6]int
	AggregationZoneHeight int
	BowTieHeight          [6]int
	OversampleZone        [6]int
	FinalProductWidth     int
	ReconstructionBand    uint16
}

var ChannelsParameters = map[uint16]ChannelParameters{
	800: {
		APID:                  800,
		ChannelName:           "M04",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	801: {
		APID:                  801,
		ChannelName:           "M05",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    800,
	},
	802: {
		APID:                  802,
		ChannelName:           "M03",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    800,
	},
	803: {
		APID:                  803,
		ChannelName:           "M02",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    802,
	},
	804: {
		APID:                  804,
		ChannelName:           "M01",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    803,
	},
	805: {
		APID:                  805,
		ChannelName:           "M06",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	806: {
		APID:                  806,
		ChannelName:           "M07",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	807: {
		APID:                  807,
		ChannelName:           "M09",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	808: {
		APID:                  808,
		ChannelName:           "M10",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	809: {
		APID:                  809,
		ChannelName:           "M08",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    808,
	},
	810: {
		APID:                  810,
		ChannelName:           "M11",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    808,
	},
	811: {
		APID:                  811,
		ChannelName:           "M13",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 2, 3, 3, 2, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	812: {
		APID:                  812,
		ChannelName:           "M12",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	813: {
		APID:                  813,
		ChannelName:           "I04",
		AggregationZoneWidth:  [6]int{1280, 736, 1184, 1184, 736, 1280},
		AggregationZoneHeight: 31,
		BowTieHeight:          [6]int{6, 2, 0, 0, 2, 6},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     6400,
		ReconstructionBand:    000,
	},
	814: {
		APID:                  814,
		ChannelName:           "M16",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	815: {
		APID:                  815,
		ChannelName:           "M15",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    000,
	},
	816: {
		APID:                  816,
		ChannelName:           "M14",
		AggregationZoneWidth:  [6]int{640, 368, 592, 592, 368, 640},
		AggregationZoneHeight: 15,
		BowTieHeight:          [6]int{3, 1, 0, 0, 1, 3},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     3200,
		ReconstructionBand:    815,
	},
	817: {
		APID:                  817,
		ChannelName:           "I05",
		AggregationZoneWidth:  [6]int{1280, 736, 1184, 1184, 736, 1280},
		AggregationZoneHeight: 31,
		BowTieHeight:          [6]int{6, 2, 0, 0, 2, 6},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     6400,
		ReconstructionBand:    000,
	},
	818: {
		APID:                  818,
		ChannelName:           "I01",
		AggregationZoneWidth:  [6]int{1280, 736, 1184, 1184, 736, 1280},
		AggregationZoneHeight: 31,
		BowTieHeight:          [6]int{6, 2, 0, 0, 2, 6},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     6400,
		ReconstructionBand:    000,
	},
	819: {
		APID:                  819,
		ChannelName:           "I02",
		AggregationZoneWidth:  [6]int{1280, 736, 1184, 1184, 736, 1280},
		AggregationZoneHeight: 31,
		BowTieHeight:          [6]int{6, 2, 0, 0, 2, 6},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     6400,
		ReconstructionBand:    818,
	},
	820: {
		APID:                  820,
		ChannelName:           "I03",
		AggregationZoneWidth:  [6]int{1280, 736, 1184, 1184, 736, 1280},
		AggregationZoneHeight: 31,
		BowTieHeight:          [6]int{6, 2, 0, 0, 2, 6},
		OversampleZone:        [6]int{1, 1, 1, 1, 1, 1},
		FinalProductWidth:     6400,
		ReconstructionBand:    819,
	},
}
